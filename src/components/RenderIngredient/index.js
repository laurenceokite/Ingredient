import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { convertMeasure } from "../../utils/helpers"


function RenderIngredient({ name, amounts, measSystem }) {
    const [ state ] = useStoreContext();

    const [ingredientState, setIngredientState] = useState({
        measSystem: measSystem,
        submeasure: amounts[measSystem].submeasure,
        newMeasurement: false
    });

    console.log(measSystem, ingredientState);

    const { value, submeasure } = amounts[measSystem];

    const ingredientMeasurement = getIngredientMeasurement();
    const ingredientMeasurementString = convertMeasurementToString(ingredientMeasurement);

    function getExistingMeasurement(obj) {
        const existingMeasurements = [];
        Object.entries(obj).forEach(([key, value]) => {if (value.value) { existingMeasurements.push([key, value]) }});
        if (existingMeasurements.length > 1) {

        }
        return existingMeasurements[0];
    };

    function getIngredientMeasurement() {

        //If global state measurement system has been changed, set submeasure to no "newMeasurement" and return value or false
        if (!value && !state.autoConvert && ingredientState.newMeasurement) {
            setIngredientState({
                measSystem: measSystem,
                submeasure: amounts[measSystem].submeasure,
                newMeasurement: false
            });
            
            return value;
        } 

        //If auto convert is on, and no preexisting value, convert to new measSystem using convertMeasure
        else if (!value && state.autoConvert && (!ingredientState.newMeasurement || ingredientState.measSystem !== measSystem)) {
            const existingMeasurement = getExistingMeasurement(amounts);

            const existingSubmeasure = existingMeasurement[1].submeasure;
            const existingValue = existingMeasurement[1].value;
            const existingSystem = existingMeasurement[0];

            console.log(measSystem);
            
            const { newMeasurement, newSubmeasure } = convertMeasure([existingSystem, existingSubmeasure], [measSystem], existingValue);

            setIngredientState({
                measSystem: measSystem,
                submeasure: newSubmeasure,
                newMeasurement: newMeasurement
            });

            return newMeasurement;
        }

        //If there is a saved value and nothing has been changed, return saved value
        else if (value){
            console.log(measSystem);
            if (measSystem !== ingredientState.measSystem) {
                setIngredientState({
                    measSystem: measSystem,
                    submeasure: amounts[measSystem].submeasure,
                    newMeasurement: false
                });
            }
            return(value);
        }

        //If submeasure has changed return new measurement
        else if (ingredientState.newMeasurement) {
            return(ingredientState.newMeasurement);
        } 

        else {
            if (measSystem !== ingredientState.measSystem) {
                setIngredientState({
                    measSystem: measSystem,
                    submeasure: amounts[measSystem].submeasure,
                    newMeasurement: false
                });
            }
            return(false);
        }
    }

    function handleSubmeasureChange(event) {
        const newSubmeasure = event.target.value;

        const existingMeasurement = getExistingMeasurement(amounts);
        const existingSubmeasure = existingMeasurement[1].submeasure;
        const existingValue = existingMeasurement[1].value;
        const existingSystem = existingMeasurement[0];

        const { newMeasurement } = convertMeasure([existingSystem, existingSubmeasure], [measSystem, newSubmeasure], existingValue);
        setIngredientState({
            measSystem: measSystem,
            submeasure: newSubmeasure,
            newMeasurement: newMeasurement 
        }) 
    }

    //convert measurement number to string, formatted with commas and rounded to 0, 1 or 2 decimal points
    function convertMeasurementToString(measurement) {
        if (measurement) {
            //if measurement is in pounds send to displayPounds function for further formatting
            if (ingredientState.submeasure === 'pounds') {
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

        //format pounds for display as string
        function displayPounds(measurement) {
            const poundsInt = parseInt(measurement).toLocaleString();
            const remainder = measurement % 1;
            const remainderAsOunces = (remainder*16).toFixed(1);
            
            if (remainder) {
                return `${poundsInt}: ${remainderAsOunces}`;
            }
            else if (measurement) {
                return measurement;
            } 
            else {
                return false;
            }
        }
    }

    return(
        <div>
            <div>{name}</div>

            <div>
                { ingredientMeasurement 
                    ? (<div>{ingredientMeasurementString}</div>)
                    : (<form>
                        <input type="text" placeholder="No Amt."/>
                    </form>)
                }        
            </div>

            

            <form id={`${name}MeasurementSelect`} onChange={handleSubmeasureChange}>
                        {(measSystem === 'us_volume') && (
                        <select className="imperialVolumeSelect" defaultValue={ingredientState.submeasure}>
                            <option value="gallons">G</option>
                            <option value="quarts">Q</option>
                            <option value="cups">C</option>
                            <option value="tablespoons">T</option>
                            <option value="teaspoons">t</option>
                            <option value="fluid-ounces">fl. oz.</option>
                        </select>
                        )}
                        
                        {(measSystem === 'us_weight') && (
                        <select className="imperialWeightSelect" defaultValue={ingredientState.submeasure}>
                            <option value="pounds">lbs.</option>
                            <option value="ounces">oz.</option>
                        </select>
                        )}
                        {/* if Metric */}
                        {(measSystem === 'metric_volume') && (
                        <select className="metricVolumeSelect" defaultValue={ingredientState.submeasure}>
                            <option value="liters">L</option>
                            <option value="milliliters">mL</option>
                        </select>
                        )}

                        {(measSystem === 'metric_weight') && (
                        <select className="metricWeightSelect" defaultValue={ingredientState.submeasure}>
                            <option value="kilograms">kg</option>
                            <option value="grams">g</option>
                            <option value="milligrams">mg</option>
                        </select>
                        )}
                    </form>    
        </div>
    )
}

export default RenderIngredient;