import React, { useState } from 'react';
import ToggleMeasure from '../ToggleMeasure';
import RenderIngredient from '../RenderIngredient';
import { useStoreContext } from "../../utils/GlobalState";
import { relativeValues } from "../RenderIngredient/relativeValues";
import { EDIT_RECIPE } from '../../utils/actions';
import './index.css';

function ViewEditRecipe() {
    const [ state, dispatch ] = useStoreContext();

    const {...currentUnits} = relativeValues[state.globalSystem][state.globalUnit];
    const selected = (obj) => {
        for (const [key, value] of Object.entries(obj)) {
            if (obj[key].selected) {
                return {
                    initUnit: key,
                    initFactor: currentUnits[key].value
                };
            } 
        }
    }
    
    const { initUnit, initFactor } = selected(currentUnits);

    const [formState, setFormState] = useState({ 
        name: '',
        amount: false,
        unit: initUnit,
        factor: initFactor
    });


    const addIngredient = (event) => {
        event.preventDefault();

        const standardVal = formState.amount * formState.factor;
        
        dispatch({
            type: EDIT_RECIPE,
            recipeState: {
                ...state.recipeState,
                ingredients: [
                    ...state.recipeState.ingredients, 
                    {
                        name: formState.name,
                        [state.globalUnit]: {
                            value: standardVal,
                            default: formState.unit
                        },
                        index: state.recipeState.ingredients.length
                    }
                ]
            }
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

        if (name === 'unit') {
            const index = event.target.options.selectedIndex;
            const options = event.target.options

            setFormState({
                ...formState,
                [name]: value,
                factor: options[index].dataset.factor
            });

            return;
        }

        setFormState({
          ...formState,
          [name]: value
        });
    };

    console.log(formState.unit);

    return(
        <div className='viewEditRecipe'>
            {/* Change measurement type here */}
            <ToggleMeasure/>

            {/* Map array of ingredients */}
            <table>
                {state.recipeState.ingredients.map(ingredient => (
                    <RenderIngredient key={ingredient.index} data={ingredient} currentUnits={currentUnits}/>
                ))}
            </table>

            {/* Ingredient Input */}
                <form onSubmit={addIngredient}>
                    <div className='ingredient-input'>
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
                            <select onChange={handleChange} name='unit' defaultValue={formState.unit}>

                                {Object.entries(currentUnits).map(([key, obj]) => (
                                    <option data-factor={obj.value} key={key} value={key}>
                                            {obj.abbrev}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div> 
                    {/* Add Ingredient Button */}
                    <input type="submit" value="+"></input>
                </form>
        </div>
    )
};

export default ViewEditRecipe;