import React, { useEffect, useState } from 'react';
import ToggleMeasure from '../ToggleMeasure';
import RenderIngredient from '../RenderIngredient';
import { useStoreContext } from "../../utils/GlobalState";

function ViewEditRecipe() {
    const [ state, dispatch ] = useStoreContext();

    const [addIngredientState, setAddIngredientState] = useState({ 
        //This is how data will be structured in each ingredient
        ingredient: '',
            amounts: {
                metric_weight:
                {
                    value: '',
                    submeasure: 'grams'
                },
                us_weight:
                {
                    value: '',
                    submeasure: 'ounces'
                },
                metric_volume:
                {
                    value: '',
                    submeasure: 'milliliters'
                },
                us_volume:
                {
                    value: '',
                    submeasure: 'cups'
                }
            }
    
    });

    //recipe name and array of ingredients
    const [recipeState, setRecipeState] = useState({ 
        recipe: '', 
        ingredients: []
    });

    //'measSystem' tells us what measurement to display based on which options are selected
    const measSystem = `${state.measurementSystem}_${state.measurementType}`;
    const [previousMeasSystem, setPreviousMeasSystem] = useState(measSystem);
    


    // Push new ingredient to 'ingredients' array
    function addIngredient(event) {
        event.preventDefault();
        //convert value string to floating-point number, formatted to six decimal points
        const valueParsed = parseFloat(addIngredientState.amounts[measSystem].value).toFixed(6);

        //Update addIngredientState
        setAddIngredientState({
            ...addIngredientState,
            amount: {
                ...addIngredientState.amounts,
                [measSystem]:
                {
                    value: valueParsed,
                    ...addIngredientState.amounts[measSystem]
                }
            }
        });

        setRecipeState({
            //Add ingredient to array of objects in recipeState
            ...recipeState,
            ingredients: [...recipeState.ingredients, {
                ingredient: addIngredientState.ingredient,
                    amounts: {
                        ...addIngredientState.amounts
                    }  
            }]
        });

        // Reset ingredient input form to original state
        setAddIngredientState({
            ingredient: '',
            amounts: {
                metric_weight:
                {
                    value: '',
                    submeasure: 'grams'
                },
                us_weight:
                {
                    value: '',
                    submeasure: 'ounces'
                },
                metric_volume:
                {
                    value: '',
                    submeasure: 'milliliters'
                },
                us_volume:
                {
                    value: '',
                    submeasure: 'cups'
                }
            }
        });
    };

    // Each time text is entered to input, update formState
    //Ingredient Input
    const handleNameChange = event => {
        const { value } = event.target;
        setAddIngredientState({
          ...addIngredientState,
          ingredient: value
        });
    };
    //Amount Input
    const handleAmountChange = event => {
        const { value } = event.target;
        const submeasure = document.getElementById('measurementSelect').firstChild.value;
        
        setAddIngredientState({
            ...addIngredientState,
            amounts: {
                ...addIngredientState.amounts,
                [measSystem]:
                {
                    value: value,
                    submeasure: submeasure
                }
            }
        });
    };

    //If global measure system has been changed, clear state and move amount to new measure system
    useEffect(()=>{
        const submeasure = document.getElementById('measurementSelect').firstChild.value;
        const ingredientAmtInput = document.getElementById('ingredientAmtInput').value;

        if (measSystem !== previousMeasSystem) {
            if (ingredientAmtInput) {
                const previousAmount = addIngredientState.amounts[previousMeasSystem].value;
                setAddIngredientState({
                    ...addIngredientState,
                    amount: {
                        ...addIngredientState.amount,
                        [previousMeasSystem]:
                        {
                            value: '',
                            submeasure: addIngredientState.amount[previousMeasSystem].submeasure
                        },
                        [measSystem]:
                        {
                            value: previousAmount,
                            submeasure: submeasure
                        }
                    }
                });
                setPreviousMeasSystem(measSystem);
            } else {
                setPreviousMeasSystem(measSystem);
            }
        }

    }, [previousMeasSystem, measSystem, addIngredientState]);

    return(
        <div>
            {/* Change measurement type here */}
            <ToggleMeasure/>

            {/* Map array of ingredients */}
            <div>
                    {recipeState.ingredients.map(ingredient => (
                        <RenderIngredient key={ingredient.ingredient} name={ingredient.ingredient} amounts={ingredient.amounts} measSystem={measSystem}/>
                    ))}
            </div>

            {/* Ingredient Input */}
                <form onSubmit={addIngredient}>
                    <div>
                        <input type="text" 
                            placeholder="Ingredient" 
                            id='ingredientNameInput'
                            name='ingredient'
                            value={addIngredientState.ingredient}
                            autoComplete="off" 
                            onChange={handleNameChange}/>

                        <input type="number" 
                            placeholder="Amount"
                            id='ingredientAmtInput'
                            name='amount'
                            value={addIngredientState.amounts[measSystem].value}
                            onChange={handleAmountChange}
                            autoComplete="off"/>
                    </div>

                    {/* Measurement Select, Displays each set of options conditionally based on state */}

                    {/* if Imperial */}
                    <div id='measurementSelect'>
                        {(measSystem === 'us_volume') && (
                        <select className="imperialVolumeSelect" defaultValue='cups'>
                            <option value="gallons">G</option>
                            <option value="quarts">Q</option>
                            <option value="cups">C</option>
                            <option value="tablespoons">T</option>
                            <option value="teaspoons">t</option>
                            <option value="fluid_ounces">fl. oz.</option>
                        </select>
                        )}
                        
                        {(measSystem === 'us_weight') && (
                        <select className="imperialWeightSelect" defaultValue="ounces">
                            <option value="pounds">lbs.</option>
                            <option value="ounces">oz.</option>
                        </select>
                        )}
                        {/* if Metric */}
                        {(measSystem === 'metric_volume') && (
                        <select className="metricVolumeSelect" defaultValue="milliliters">
                            <option value="liters">L</option>
                            <option value="milliliters">mL</option>
                        </select>
                        )}

                        {(measSystem === 'metric_weight') && (
                        <select className="metricWeightSelect" defaultValue="grams">
                            <option value="kilograms">kg</option>
                            <option value="grams">g</option>
                            <option value="milligrams">mg</option>
                        </select>
                        )}
                    </div> 
                    {/* Add Ingredient Button */}
                    <div>
                        <input type="submit" value="+"></input>
                    </div>
                </form>
        </div>
    )
};

export default ViewEditRecipe;