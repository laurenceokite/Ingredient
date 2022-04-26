import { relativeValues } from "./relativeValues";

export class Ingredient {
    constructor(data, unit, system) {
        this.system = system;
        this.unit = unit;

        this.weight = false;
        this.volume = false;

        Object.assign(this, data);
    }

    //convert any value based on relativeValues
    convert(requested) {
        const { unit, system } = this;
        const relativeValue = relativeValues[system][unit][requested].value;

        //all other functions in Ingredient call convert(), return raw value as any unit measurement
        return {
            measurement: this[unit].value / relativeValue,
            newUnit: requested
        };
    }

    //return measurement as default unit
    default() {
        const { unit, system } = this;
        const requested = this[unit].default;

        //.default() evaluates to true or false
        if (!relativeValues[system][unit][requested]) {
            return false;
        }

        return this.convert(requested);
    }

    //if default() = false, findConciseUnit can find closest in relativeValues
    findConciseUnit() {
        const { unit, system } = this;

        let oppUnit;
        let thisValue;
        let quotient;

        //define opposite global unit
        if (unit === 'volume') 
        { oppUnit = 'weight' }

        else oppUnit = 'volume';

        //check both global units for a value
        if (this[unit]) 
        { thisValue = this[unit].value }

        else thisValue = this[oppUnit].value;

        //Iterate through values to find closest unit
        for (const [key, value] of Object.entries(relativeValues[system][unit])) {
            const thisQuotient = Math.abs(value.value / thisValue);
            if (quotient) {
                if (quotient.val > thisQuotient && thisQuotient > 1) {
                    quotient = {
                        val: thisQuotient,
                        key: key 
                    };
                }
            }
            if (!quotient) {
                quotient = {
                    val: thisQuotient,
                    key: key 
                };
            }
        }

        console.log(quotient.key);

        return this.convert(quotient.key);
    }
}