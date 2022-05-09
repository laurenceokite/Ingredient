import React, { useState, useRef } from "react";
import UnitSelect from "../UnitSelect";
import { useStoreContext } from "../../utils/GlobalState";
import { Ingredient, UnitInterface } from "../Recipe/Ingredient";
import { Recipe } from "../Recipe/Recipe";
import './index.css';

interface RenderIngredientInterface {
    ingredient: Ingredient,
    recipe: Recipe,
    currentUnits: UnitInterface[],
}

const RenderIngredient = ({ ingredient, recipe, currentUnits }: RenderIngredientInterface) => {
    const [ state ] = useStoreContext();
    const [ingredientState, setIngredientState] = useState({});

    console.log(ingredient, recipe, currentUnits);
    let thisUnit = ingredient.returnSelected(recipe.state).unit;
    let thisValue = ingredient.returnSelected(recipe.state).value;

    useRef(() => {
        thisUnit = ingredient.returnSelected(recipe.state).unit;
        thisValue = ingredient.returnSelected(recipe.state).value;
    });

    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        ingredient.updateSelected(recipe.state, value);
        setIngredientState({}); // Hack to re render ingredient.. 
    }

    const handleChangeValue = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        ingredient.updateValue(recipe.state, thisUnit, value);
        setIngredientState({}); // Hack to re render ingredient.. 
    }
    
    return(
        <tbody>
             <tr>
                <td className="ingredient-name">{ingredient.name}</td>
                <td className="ingredient-measurement">
                    <form>
                        <input 
                            type="text" 
                            placeholder="No Amt." 
                            value={thisValue ? thisValue : ''} 
                            onChange={handleChangeValue}
                        />
                    </form>
                </td>
                <td id='unitSelect' className="unit-select" onChange={handleChangeUnit}>
                    <UnitSelect 
                        ingredient={ingredient}
                        currentUnits={currentUnits}
                        state={recipe.state}
                        selectedUnit={ingredient.returnSelected(recipe.state)}
                    />
                </td>
                <td>
                    <input type="number"></input>
                </td>
            </tr> 
        </tbody>
    )
}

export default RenderIngredient;