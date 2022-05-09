import React, { useState } from 'react';
import ToggleGlobals from '../ToggleGlobals';
import RenderIngredient from '../RenderIngredient';
import UnitSelect from '../UnitSelect';
import { useStoreContext } from "../../utils/GlobalState";
import { Ingredient, UnitInterface, IngredientDataInterface } from './Ingredient';
import { Recipe } from './Recipe';
import './index.css';
import { useEffect } from 'react';

const ViewEditRecipe = () => {
    const [ state, dispatch ] = useStoreContext();

    const [ recipe, setRecipe ] = useState<Recipe>(new Recipe('metric', 'weight', 0))

    //using info from our super(null); aka new Ingredient(null); call in Recipe (extends Ingredient)
    const currentUnits: UnitInterface[] = recipe.returnCurrentUnits(recipe.state);
    const selectedUnit: UnitInterface = recipe.returnSelected(recipe.state);

    console.log(currentUnits, recipe.state)

    const [formState, setFormState] = useState<IngredientDataInterface>({ 
        name: '',
        value: 0,
        unit: selectedUnit.unit,
        state: recipe!.state
    });

    const addIngredient = (event: React.FormEvent): void => {
        event.preventDefault();
        
        setRecipe(recipe.addIngredient(new Ingredient(formState)));

        // Reset ingredient input form to original state
        setFormState({
            name: '',
            value: 0,
            unit: selectedUnit.unit,
            state: recipe.state
        });
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
            <ToggleGlobals recipe={recipe} />

            {/* Map array of ingredients */}
            <table>
                {recipe.ingredients && recipe.ingredients.map((ingredient: Ingredient) => (
                <RenderIngredient 
                    key={ingredient.name} 
                    recipe={recipe}
                    ingredient={ingredient} 
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
                                ingredient={recipe}
                                state={recipe.state}
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