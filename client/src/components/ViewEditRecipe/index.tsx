import React, { useState } from 'react';
import ToggleMeasure from '../ToggleMeasure';
import RenderIngredient from '../RenderIngredient';
import UnitSelect from '../UnitSelect';
import { useStoreContext, GlobalSystems, GlobalUnits, KeyOfIngredient } from "../../utils/GlobalState";
import { Ingredient, UnitInterface, IngredientDataInterface } from './Ingredient';
import { EDIT_RECIPE } from '../../utils/actions';
import './index.css';
import { useEffect } from 'react';

const ViewEditRecipe = () => {
    const [ state, dispatch ] = useStoreContext();

    const globalSystem: GlobalSystems = state.globalSystem;
    const globalUnit: GlobalUnits = state.globalUnit;

    //this is the state as a key of Ingredient object
    const keyOfIngredient: KeyOfIngredient = `${globalSystem}_${globalUnit}`;

    //utilizing 'Ingredient's init values to populate our form <select>
    const formIngredient = new Ingredient(null);

    const currentUnits: UnitInterface[] = formIngredient.returnCurrentUnits(keyOfIngredient);
    const selectedUnit: UnitInterface = formIngredient.returnSelected(keyOfIngredient);

    const [formState, setFormState] = useState<IngredientDataInterface>({ 
        name: '',
        value: 0,
        unit: selectedUnit.unit,
        state: keyOfIngredient
    });

    useEffect(() => {
        setFormState({
            ...formState,
            state: keyOfIngredient,
            unit: selectedUnit.unit
        })    
    }, [state]);

    const addIngredient = (event: React.FormEvent): void => {
        event.preventDefault();

        console.log(formState);

        const newIngredient = new Ingredient(formState);
        
        dispatch({
            type: EDIT_RECIPE,
            recipeState: {
                ...state.recipeState,
                ingredients: [
                    ...state.recipeState.ingredients, 
                    newIngredient
                ]
            }
        });

        // Reset ingredient input form to original state
        setFormState({
            name: '',
            value: 0,
            unit: selectedUnit.unit,
            state: keyOfIngredient
        });
        console.log(formState);
    };

    const handleChange = (event: React.FormEvent): void => {
        const { value, name } = event.target as HTMLFormElement;

        setFormState({
          ...formState,
          [name]: value
        });
    };

    return(
        <div className='viewEditRecipe'>
            {/* Change measurement type here */}
            <ToggleMeasure/>

            {/* Map array of ingredients */}
            <table>
                {state.recipeState.ingredients.map((ingredient: Ingredient) => (
                <RenderIngredient 
                    key={ingredient.name} 
                    data={ingredient} 
                    currentUnits={currentUnits}
                />     
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
                                name='value'
                                value={formState.value?formState.value:''}
                                onChange={handleChange}
                                autoComplete="off"/>
                        </div>

                        <div id='measurementSelect'>
                            <UnitSelect 
                                currentUnits={currentUnits} 
                                selectedUnit={selectedUnit}
                                ingredient={formIngredient}
                                keyOfIngredient={keyOfIngredient}
                            />
                        </div>
                    </div> 
                    {/* Add Ingredient Button */}
                    <input type="submit" value="+"></input>
                </form>
        </div>
    )
};



export default ViewEditRecipe;