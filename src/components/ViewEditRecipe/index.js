import React, { useState } from 'react';
import ToggleMeasure from '../ToggleMeasure';
import RenderIngredient from '../RenderIngredient';
import { useStoreContext } from "../../utils/GlobalState";
import { relativeValues } from "../RenderIngredient/relativeValues";

function ViewEditRecipe() {
    const [ state ] = useStoreContext();

    const {...currentUnits} = relativeValues[state.globalSystem][state.globalUnit];
    const selected = () => {
        for (const [key, value] of Object.entries(currentUnits)) {
            if (currentUnits[key].selected) {
                return {
                    initUnit: key,
                    initFactor: currentUnits[key].value
                };
            } 
        }
    }
    const { initUnit, initFactor } = selected();

    const [formState, setFormState] = useState({ 
        name: '',
        amount: false,
        unit: initUnit,
        factor: initFactor
    });

    //recipe name and array of ingredients
    const [recipeState, setRecipeState] = useState({ 
        name: '', 
        ingredients: [],
        globalState: {}
    });

    // Push new ingredient to 'ingredients' array
    const addIngredient = (event) => {
        event.preventDefault();

        const standardVal = formState.amount * formState.factor;

        setRecipeState({
            //Add ingredient to array of objects in recipeState
            ...recipeState,
            ingredients: [
                ...recipeState.ingredients, 
                {
                    name: formState.name,
                    [state.globalUnit]: {
                        value: standardVal,
                        default: formState.unit
                    }
                }
            ]
        });
        // Reset ingredient input form to original state
        setFormState({
            name: '',
            amount: false,
            unit: initUnit,
            factor: initFactor
        });
    };

    const handleChange = event => {
        const { value, name } = event.target;

        setFormState({
          ...formState,
          [name]: value
        });

        if (name === 'unit') {
            const index = event.target.options.selectedIndex;
            const options = event.target.options
            setFormState({
                ...formState,
                factor: options[index].dataset.factor
            });
        }
    };

    return(
        <div>
            {/* Change measurement type here */}
            <ToggleMeasure/>

            {/* Map array of ingredients */}
            <div>
                    {recipeState.ingredients.map(ingredient => (
                        <RenderIngredient key={ingredient.name} data={ingredient} currentUnits={currentUnits}/>
                    ))}
            </div>

            {/* Ingredient Input */}
                <form onSubmit={addIngredient}>
                    <div>
                        <input type="text" 
                            placeholder="Ingredient" 
                            id='ingredientNameInput'
                            name='name'
                            value={formState.name}
                            autoComplete="off" 
                            onChange={handleChange}/>

                        <input type="number" 
                            placeholder="Amount"
                            id='ingredientAmtInput'
                            name='amount'
                            value={formState.amount}
                            onChange={handleChange}
                            autoComplete="off"/>
                    </div>

                    {/* Measurement Select, Displays each set of options conditionally based on state */}
                    <div id='measurementSelect'>
                        <select onChange={handleChange} name='unit'>
                            {Object.entries(currentUnits).map(([key, obj]) => (
                                <option data-factor={obj.value} 
                                    value={key} 
                                    key={key} 
                                    selected={obj.selected}>{obj.abbrev}</option>
                                ))}
                        </select>
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