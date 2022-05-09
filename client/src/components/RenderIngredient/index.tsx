import React, { useState, useEffect, useRef } from "react";
import UnitSelect from "../UnitSelect";
import { useStoreContext, GlobalSystems, GlobalUnits, KeyOfIngredient } from "../../utils/GlobalState";
import { Ingredient, UnitInterface } from "../ViewEditRecipe/Ingredient";
import './index.css';

interface RenderIngredientInterface {
    data: Ingredient,
    currentUnits: UnitInterface[],
}

const RenderIngredient = ({ data , currentUnits }: RenderIngredientInterface) => {
    const [ state ] = useStoreContext();
    const [ingredient, setIngredient] = useState({});

    const globalSystem: GlobalSystems = state.globalSystem;
    const globalUnit: GlobalUnits = state.globalUnit;

    //this is the state as a key of Ingredient object
    const keyOfIngredient: KeyOfIngredient = `${globalSystem}_${globalUnit}`;

    let thisUnit = data.returnSelected(keyOfIngredient).unit;
    let thisValue = data.returnSelected(keyOfIngredient).value;

    useRef(() => {
        thisUnit = data.returnSelected(keyOfIngredient).unit;
        thisValue = data.returnSelected(keyOfIngredient).value;
    });

    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        data.updateSelected(keyOfIngredient, value);
        setIngredient({}); // Hack to re render ingredient.. 
    }

    const handleChangeValue = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        data.updateValue(keyOfIngredient, thisUnit, value);
        setIngredient({}); // Hack to re render ingredient.. 
    }
    
    return(
        <tbody>
             <tr>
                <td className="ingredient-name">{data.name}</td>
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
                        ingredient={data}
                        currentUnits={currentUnits}
                        keyOfIngredient={keyOfIngredient}
                        selectedUnit={data.returnSelected(keyOfIngredient)}
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