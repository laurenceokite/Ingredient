import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { Ingredient } from "../../utils/Ingredient";


function RenderIngredient({ data }) {
    const [ state ] = useStoreContext();
    const unit = state.globalUnit;
    const system = state.globalSystem;

    const ingredient = new Ingredient(data);
    const name = ingredient.name;
    const defaultUnit = ingredient[unit].default;
    
    const [localUnit, setLocalUnit] = useState(defaultUnit);

    const returnMeasurement = () => {
        const options = Array.from(document.getElementById('measurementSelect').firstChild.options);
        const optionsIncludesDefault = options.some(option => option.value === defaultUnit);

        if (optionsIncludesDefault) {
            const string = ingredient.default(unit);
            return string;
        }

    }

    console.log(returnMeasurement());

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

    //convert measurement number to string, formatted with commas and rounded to 0, 1 or 2 decimal points
    const convertMeasurementToString = (measurement) => {
        if (measurement) {
            //if measurement is in pounds send to displayPounds function for further formatting
            if (measurement) {
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

    const handleUnitChange = event => {
        const value = event.target.value;
        setLocalUnit(value);
        console.log(localUnit)
    }

    const measurement = returnMeasurement();

    return(
        <div>
            <div>{name}</div>
            <div>
                {  measurement
                    ? (<div>{measurement}</div>)
                    : (<form>
                        <input type="text" placeholder="No Amt."/>
                    </form>)
                }        
            </div>
            <div id='unitSelect' onChange={handleUnitChange}>
                {(system === 'us') && ((unit === 'volume') ?
                    (<select defaultValue={ingredient[unit].default}>
                        <option data-factor="3785" value="gallons">G</option>
                        <option data-factor="946" value="quarts">Q</option>
                        <option data-factor="240" value="cups">C</option>
                        <option data-factor="14.787" value="tablespoons">T</option>
                        <option data-factor="4.929" value="teaspoons">t</option>
                        <option data-factor="29.574" value="fluidOunces">fl. oz.</option>
                    </select>) :
                    (
                    <select defaultValue={ingredient[unit].default}>
                        <option data-factor="454" value="pounds">lbs.</option>
                        <option data-factor="28.35" value="ounces">oz.</option>
                    </select>
                    )
                )}

                {(system=== 'metric') && ((system === 'weight') ?
                    (<select defaultValue={ingredient[unit].default}>
                        <option data-factor="1000" value="liters">L</option>
                        <option data-factor="1" value="milliliters">mL</option>
                    </select>
                    ) :

                    (<select defaultValue={ingredient[unit].default}>
                        <option data-factor="1000" value="kilograms">kg</option>
                        <option data-factor="1" value="grams">g</option>
                        <option data-factor=".001" value="milligrams">mg</option>
                    </select>
                    )   
                )}
            </div>
        </div>
    )
}

export default RenderIngredient;