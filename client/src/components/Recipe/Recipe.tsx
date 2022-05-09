import { Ingredient, IngredientDataInterface } from "./Ingredient";

type GlobalSystems = 'metric' | 'us';
type GlobalUnits = 'weight' | 'volume';
export type State = `${GlobalSystems}_${GlobalUnits}`;

export class Recipe extends Ingredient {
    multiplier = 1;

    system: GlobalSystems;
    units: GlobalUnits;
    state: State;
    anchorIndex: number;
    name?: string;
    ingredients?: Ingredient[];

    constructor(system: GlobalSystems, units: GlobalUnits, anchorIndex: number, name?: string, ingredients?: Ingredient[]) {
        super(null);//gets info to pass to selects

        this.system = system;
        this.units = units;
        this.state = `${this.system}_${this.units}`
        this.anchorIndex = anchorIndex;
        if (name) this.name = name;
        if (ingredients) this.ingredients = ingredients;
    }

    changeState(system?: GlobalSystems, units?: GlobalUnits): Recipe {
        if (system) this.system = system;
        if (units) this.units = units;
        
        this.state = `${this.system}_${this.units}`
        return this;
    }

    addIngredient(ingredient: Ingredient): Recipe {
        if (!this.ingredients) this.ingredients = [ingredient];
        this.ingredients = [
            ...this.ingredients,
            ingredient
        ]
        return this;
    }
}

