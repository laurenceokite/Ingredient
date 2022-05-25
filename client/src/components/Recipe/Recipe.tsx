import { Ingredient } from "./Ingredient";
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

    //divide all values by value of anchor ingredient
    getBakersPercents() {
        const anchor = this.ingredients[this.anchorIndex];
        const anchorValue = this.state.includes('weight') ? anchor.standardWeight : anchor.standardVolume;

        for (const ingredient of this.ingredients) {
            const ingredientValue = this.state.includes('weight') ? ingredient.standardWeight : ingredient.standardVolume;
            
            ingredient.bakersPercentage = (ingredientValue! / anchorValue!) * 100;
        }
    }

    //change recipe system and/or unit
    changeState(system: GlobalSystems, units: GlobalUnits): Recipe {
        this.system = system;
        this.units = units;
        
        this.state = `${this.system}_${this.units}`;

        this.getBakersPercents();
        return this;
    }

    addIngredient(ingredient: Ingredient): Recipe {
        this.ingredients.push(ingredient);

        this.getBakersPercents();
        return this;
    }
}

