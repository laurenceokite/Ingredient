import { makeAutoObservable } from "mobx";
import { State } from "./Recipe"

interface UnitInterface {
    unit: string; 
    divisor: number;
    abbrev: string; 
    selected: boolean; 
    value: number;
}

interface IngredientInterface {
    metric_weight: UnitInterface[];
    us_weight: UnitInterface[];
    metric_volume: UnitInterface[];
    us_volume: UnitInterface[];
}

interface IngredientDataInterface {
    name: string;
    value: number;
    unit: string;
    state: keyof IngredientInterface;
}

interface IStandardValues {
    weight?: number;
    volume?: number;
}

const returnWeightOrVolume = (input: State): keyof IStandardValues => {
    if (input.includes('volume')) return 'volume';
    else return 'weight';
}

class Ingredient implements IngredientInterface {
    metric_weight = [
        { unit: 'milligrams', divisor: .001, abbrev: 'mg', selected: false, value: 0 },
        { unit: 'grams', divisor: 1, abbrev: 'g', selected: true, value: 0 },
        { unit: 'kilograms', divisor: 1000, abbrev: 'k', selected: false, value: 0 }
    ];   

    us_weight = [
        { unit: 'pounds', divisor: 454, abbrev: 'lbs.', selected: false , value: 0 },
        { unit: 'ounces', divisor: 28, abbrev: 'oz.', selected: true, value: 0 }
    ];

    metric_volume = [
        { unit: 'milliliters', divisor: 1, abbrev: 'mL', selected: true, value: 0 },
        { unit: 'liters', divisor: 1000, abbrev: 'L', selected: false, value: 0 },
    ];
        
    us_volume = [   
        { unit: 'cups', divisor: 240, abbrev: 'C', selected: true, value: 0 },
        { unit: 'quarts', divisor: 946, abbrev: 'Q', selected: false, value: 0 },
        { unit: 'gallons', divisor: 3785, abbrev: 'G', selected: false, value: 0 },
        { unit: 'teaspoons', divisor: 4.929, abbrev: 'tsp.', selected: false , value: 0},
        { unit: 'tablespoons', divisor: 14.787, abbrev: 'tbsp.', selected: false, value: 0 },
        { unit: 'fluidOunces', divisor: 29.575, abbrev: 'fl. oz.', selected: false, value: 0 }
    ];

    standard: IStandardValues = {
        weight: 0,
        volume: 0
    };

    name?: string;

    recipeIndex?: number;

    constructor(data?: IngredientDataInterface) {
        
        if (data) {
            this.name = data.name;
            this.updateValue(data.state, data.unit, data.value);
            this.updateSelected(data.state, data.unit);
        }
        makeAutoObservable(this);
    }

    //return relevant units, based on global state 
    returnCurrentUnits(state: keyof IngredientInterface): UnitInterface[] {
        return this[state];
    }

    //return data of unit with 'selected: true'
    returnSelected(state: keyof IngredientInterface): UnitInterface {
        const selectedUnit: UnitInterface = 
            this[state].filter(unit => unit.selected)[0];  

        return selectedUnit;
    }

    //changes selected to true on given unit, and all else in array to false
    updateSelected(state: keyof IngredientInterface, unit: string): void {

        this[state].forEach(unitData => { 
            if (unitData.unit === unit) {
                unitData.selected = true;
            }
            else unitData.selected = false;
        });
    }
    
    //update weight or volume values, by giving new value of ANY unit
    updateValue(state: keyof IngredientInterface, unit: string, value: number ): void {

        //retrieve index of requested unit
        const unitIndex: number = this[state].findIndex(unitData => unitData.unit === unit);

        //get product of value and unit divisor
        const product = this[state][unitIndex].divisor * value;

        //update array in Ingredient
        const update = (units: UnitInterface[]) => {
            units.forEach((unitData, index) => {
                const thisValue = product / unitData.divisor;
                unitData.value = thisValue;
            });
        }

        //if unit is weight
        if (state === ('metric_weight' || 'us_weight')) {
            update(this.metric_weight);
            update(this.us_weight);

            const grams = this.metric_weight[1].value;

            //update standard weight 
            this.standard.weight = grams;

            console.log(this.standard.weight);
        }

        //if unit is volume
        if (state === ('metric_volume' || 'us_volume')) {
            update(this.metric_volume);
            update(this.us_volume);

            const milliliters = this.metric_volume[0].value;

            //update standard volume
            this.standard.volume = milliliters;
        }
    }
};

export { Ingredient, UnitInterface, IngredientInterface, IngredientDataInterface, returnWeightOrVolume }

