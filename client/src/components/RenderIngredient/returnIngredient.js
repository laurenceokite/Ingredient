import { Ingredient } from "./Ingredient";

//convert measurement number to string, formatted with commas and rounded to 0, 1 or 2 decimal points
const convertToString = (measurement, requested) => {
    if (measurement) {
        //if measurement is in pounds send to displayPounds function for further formatting
        if (requested === "pounds") {
            return displayPounds(measurement);
        }
        else {
            return (Math.round(measurement*100)/100).toLocaleString();
        }
    }
    else {
        //if no measurement
        return false;
    }
}

//format pounds for display as string
const displayPounds = (measurement) => {
    const pounds = parseInt(measurement);
    const remainder = measurement % 1;
    const ounces = (remainder*16).toFixed(1);
    
    if (remainder) {
        return `${pounds}: ${ounces}`;
    }
    else if (measurement) {
        return measurement;
    } 
    else {
        return false;
    }
}

const returnIngredient = (data, unit, system, requested, autoconvert) => {
    /*
    {
        name: "",
        [unit]: {
            value: float,
            default: [default unit of measurement]
    }
    global unit and system, 

    */
    const ingredient = new Ingredient(data, unit, system);

    if (!requested || (requested === ingredient[unit].default)) {
       
        if (ingredient[unit]) {
            if (ingredient.default()) {
                const { measurement, newUnit } = ingredient.default();


                return {
                    name: ingredient.name,
                    unit: newUnit,
                    measurement: convertToString(measurement, requested)
                }

            } else {
                const { measurement, newUnit } = ingredient.findConciseUnit();
                console.log(measurement, newUnit);
                return {
                    name: ingredient.name,
                    unit: newUnit,
                    measurement: convertToString(measurement, newUnit)
                }
            }
        }

        if (autoconvert) {
            const { measurement, newUnit } = ingredient.findConciseUnit();
            return {
                name: ingredient.name,
                unit: newUnit,
                measurement: convertToString(measurement, requested)
            }
        }

        else {
            return {
                name: ingredient.name,
                unit: false,
                measurement: false
            }
        }
    }

    if (requested !== ingredient[unit].default) {
        if (ingredient[unit]) {
            const { measurement, newUnit } = ingredient.convert(requested);
            return {
                name: ingredient.name,
                unit: newUnit,
                measurement: convertToString(measurement, requested)
            }
        }

        if (autoconvert) {
            const { measurement, newUnit } = ingredient.convert(requested);
            return {
                name: ingredient.name,
                unit: newUnit,
                measurement: convertToString(measurement, requested)
            }
        }

        if (!ingredient[unit]) {
            return {
                name: ingredient.name,
                unit: requested,
                measurement: false
            }
        }
    }

    

}

export default returnIngredient;