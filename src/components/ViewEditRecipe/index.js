import React, { useEffect, useState } from 'react';
import ToggleMeasure from '../ToggleMeasure';
import RenderIngredient from '../RenderIngredient';
import { useStoreContext } from "../../utils/GlobalState";
import { Ingredient } from '../../utils/Ingredient';

function ViewEditRecipe() {
    const [ state ] = useStoreContext();

    const [formState, setFormState] = useState({ 
        name: '',
        amount: ''
    });

    //recipe name and array of ingredients
    const [recipeState, setRecipeState] = useState({ 
        name: '', 
        ingredients: []
    });

    // Push new ingredient to 'ingredients' array
    const addIngredient = (event) => {
        event.preventDefault();

        const select = document.getElementById('measurementSelect').firstChild
        console.log(select);
        const unit = select.value;
        const factor = select.options[select.selectedIndex].dataset.factor;
        const amount = parseFloat(formState.amount);

        const standardizedValue = parseFloat(amount * factor);

        console.log({
            //Add ingredient to array of objects in recipeState
            ...recipeState,
            ingredients: [
                ...recipeState.ingredients, 
                {
                    name: formState.name,
                    [state.measurementUnit]: {
                        value: standardizedValue,
                        default: unit
                    }
                }
            ]
        });

        setRecipeState({
            //Add ingredient to array of objects in recipeState
            ...recipeState,
            ingredients: [
                ...recipeState.ingredients, 
                {
                    name: formState.name,
                    [state.measurementUnit]: {
                        value: standardizedValue,
                        default: unit
                    }
                }
            ]
        });
        // Reset ingredient input form to original state
        setFormState({
            name: '',
            amount: ''
        });
    };

    // Each time text is entered to input, update formState
    //Ingredient Input
    const handleNameChange = event => {
        const { value } = event.target;
        setFormState({
          ...formState,
          name: value
        });
    };

    //Amount Input
    const handleAmountChange = event => {
        const { value } = event.target;
        const select = document.getElementById('measurementSelect').firstChild

        setFormState({
            ...formState,
            amount: value
        });
    };

    return(
        <div>
            {/* Change measurement type here */}
            <ToggleMeasure/>

            {/* Map array of ingredients */}
            <div>
                    {recipeState.ingredients.map(ingredient => (
                        <RenderIngredient key={ingredient.name} data={ingredient}/>
                    ))}
            </div>

            {/* Ingredient Input */}
                <form onSubmit={addIngredient}>
                    <div>
                        <input type="text" 
                            placeholder="Ingredient" 
                            id='ingredientNameInput'
                            name='ingredient'
                            value={formState.name}
                            autoComplete="off" 
                            onChange={handleNameChange}/>

                        <input type="number" 
                            placeholder="Amount"
                            id='ingredientAmtInput'
                            name='amount'
                            value={formState.amount}
                            onChange={handleAmountChange}
                            autoComplete="off"/>
                    </div>

                    {/* Measurement Select, Displays each set of options conditionally based on state */}
                    <div id='measurementSelect'>
                        {(state.measurementSystem === 'us') && ((state.measurementUnit === 'volume') ?
                            (<select defaultValue='cups'>
                                <option data-factor="3785" value="gallons">G</option>
                                <option data-factor="946" value="quarts">Q</option>
                                <option data-factor="240" value="cups">C</option>
                                <option data-factor="14.787" value="tablespoons">T</option>
                                <option data-factor="4.929" value="teaspoons">t</option>
                                <option data-factor="29.574" value="fluid_ounces">fl. oz.</option>
                            </select>) :
                            (
                            <select defaultValue="ounces">
                                <option data-factor="454" value="pounds">lbs.</option>
                                <option data-factor="28.35" value="ounces">oz.</option>
                            </select>
                            )
                        )}
        
                       {(state.measurementSystem === 'metric') && ((state.measurementSystem === 'weight') ?
                            (<select defaultValue="milliliters">
                                <option data-factor="1000" value="liters">L</option>
                                <option data-factor="1" value="milliliters">mL</option>
                            </select>
                            ) :

                            (<select defaultValue="grams">
                                <option data-factor="1000" value="kilograms">kg</option>
                                <option data-factor="1" value="grams">g</option>
                                <option data-factor=".001" value="milligrams">mg</option>
                            </select>
                            )   
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