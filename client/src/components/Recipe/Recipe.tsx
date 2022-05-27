import { Ingredient, IStandardValues, returnWeightOrVolume } from "./Ingredient";
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
    name?: string;
    ingredients: Ingredient[];

    constructor(system: GlobalSystems, units: GlobalUnits, anchorIndex: number, name?: string, ingredients?: Ingredient[]) {
        this.data = new Ingredient();//gets info to pass to selects

        makeAutoObservable(this);//mobx state observer.

        this.system = system;
        this.units = units;
        this.state = `${this.system}_${this.units}`
        this.anchorIndex = anchorIndex;
        this.ingredients = [];
        
        if (name) this.name = name;
        if (ingredients) this.ingredients = ingredients;
    }

    //get bakers percent of ingredient
    bakersPercent(index: number): number {
        const anchor = this.ingredients[this.anchorIndex];

        const weightOrVol = returnWeightOrVolume(this.state);

        const anchorValue = anchor.standard[weightOrVol] || 0;

        console.log(anchor.standard[weightOrVol]);
        
        const ingredientValue = this.ingredients[index].standard[weightOrVol] || 0;
            
        return (ingredientValue / anchorValue) * 100;
    }

    //change recipe system and/or unit
    changeState(system: GlobalSystems, units: GlobalUnits): Recipe {
        this.system = system;
        this.units = units;
        
        this.state = `${this.system}_${this.units}`;

        return this;
    }

    addIngredient(ingredient: Ingredient): Recipe {
        this.ingredients.push(ingredient);

        return this;
    }
}

