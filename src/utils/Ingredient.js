export class Ingredient {
    constructor(data) {
        this.name = data.name;
        this.weight = {
            value: false,
            default: false
        }
        this.volume = {
            value: false,
            default: false
        }
        Object.assign(this, data);
    }

    default(state) {
        return this.convert(this[state].default);
    }

    convert(unit) {
        switch (unit) {
            case 'grams': 
                return this.weight.value / 1;
            case 'milligrams':
                return this.weight.value / .001;
            case 'kilograms':
                return this.weight.value / 1000;

            case 'ounces':
                return this.weight.value / 28;
            case 'pounds':
                return this.weight.value / 454;

            case 'milliliters':
                return this.volume.value / 1;
            case 'liters':
                return this.volume.value / 1000;

            case 'cups':
                return this.volume.value / 240;
            case 'quarts':
                return this.volume.value / 946;
            case 'gallons':
                return this.volume.value / 3785;
            case 'teaspoons':
                return this.volume.value / 29.575;
            case 'tablespoons':
                return this.volume.value / 14.787;
            case 'fluidOunces':
                return this.volume.value / 4.929;
        }
    }
}