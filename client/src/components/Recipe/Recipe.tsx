import { Ingredient, returnWeightOrVolume } from "./Ingredient";
import { makeAutoObservable } from 'mobx'

type GlobalSystems = 'metric' | 'us';
type GlobalUnits = 'weight' | 'volume';
export type State = `${GlobalSystems}_${GlobalUnits}`;

export class Recipe {
    multiplier = 1;

    data: Ingredient;
    system: GlobalSystems;
    units: GlobalUnits;
    state: State;
    anchorIndex: number;
    recipeYield: number;
    name?: string;
    ingredients: Ingredient[];

    constructor(
        system: GlobalSystems, 
        units: GlobalUnits, 
        anchorIndex: number, 
        recipeYield: number,

        name?: string, 
        ingredients?: Ingredient[],
        
    ) 
    
    {

        this.data = new Ingredient();//unit data, UnitSelect component uses this.

        makeAutoObservable(this);//mobx

        this.system = system;
        this.units = units;
        this.state = `${this.system}_${this.units}`
        this.ingredients = [];

        this.anchorIndex = anchorIndex;
        this.recipeYield = recipeYield;
        
        if (name) this.name = name;
        if (ingredients) this.ingredients = ingredients;
    }

    // *** METHODS ***

    //change recipe system and/or unit
    changeState(system: GlobalSystems, units: GlobalUnits): Recipe {
        this.system = system;
        this.units = units;
        
        this.state = `${this.system}_${this.units}`;

        return this;
    }

    // *** ADD INGREDIENT ***
    addIngredient(ingredient: Ingredient): Recipe {
        this.ingredients.push(ingredient);
        return this;
    }

    // *** UPDATE MULTIPLIER ***
    updateMultiplier(multiplier: number) { 
        //divide new multiplier by previous multiplier
        const trueMultiplier = multiplier / this.multiplier;

        //update each ingredient weight and volume
        for (const ingredient of this.ingredients) {
            const { weight, volume } = ingredient.standard; //may be undefined so update conditionally

            if (weight) {
                const newWeight = weight * trueMultiplier;
                ingredient.updateValue(this.state, 'grams', newWeight);
            }

            if (volume) {
                const newVol = volume * trueMultiplier;
                ingredient.updateValue(this.state, 'grams', newVol);
            }
        }
        //set multiplier
        this.multiplier = multiplier;

        this.recipeYield *= trueMultiplier; 
    }

    //get bakers percent of ingredient, or update value by bakers perceent
    bakersPercent(index: number, updatePercent?: number): number {

        const anchor = this.ingredients[this.anchorIndex];

        const weightOrVol = returnWeightOrVolume(this.state);

        const milsOrGrams = (weightOrVol: string): string => {

            if (weightOrVol === 'weight') return 'grams';
            if (weightOrVol === 'volume') return 'milliliters';
            return '';
        }

        const anchorValue = anchor.standard[weightOrVol] || 0;

        const ingredient = this.ingredients[index];

        const ingredientValue = ingredient.standard[weightOrVol] || 0;

        //update value by bakers percent, if arg
        if (updatePercent) {
            const decimal = updatePercent / 100;

            const newValue = anchorValue * decimal;

            ingredient.updateValue(this.state, milsOrGrams(weightOrVol), newValue);

            return updatePercent;
        }

        //else return bakers percent
        return (ingredientValue / anchorValue) * 100;
    }
}

