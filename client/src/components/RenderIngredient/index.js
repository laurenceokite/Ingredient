import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import returnIngredient from "./returnIngredient";
import './index.css';

function RenderIngredient({ data, currentUnits }) {
    const [ state ] = useStoreContext();
    const { globalUnit: unit, globalSystem: system } = state;

    const [ requested, setRequested ] = useState();

    //reset requested dependent on state change of globalSystem
    useEffect(() => {
        setRequested();
    }, [system])

    const ingredient = returnIngredient(data, unit, system, requested, state.autoConvert);

    const handleUnitChange = event => {
        const value = event.target.value;
        setRequested(value);
    }

    return(
        <tbody>
            <tr>
                <td className="ingredient-name">{ingredient.name}</td>
                <td className="ingredient-measurement">
                    {  ingredient.measurement
                        ? (<div>{ingredient.measurement}</div>)
                        : (<form>
                            <input type="text" placeholder="No Amt."/>
                        </form>)
                    }        
                </td>
                <td id='unitSelect' className="unit-select">
                    <select onChange={handleUnitChange} name='unit' value={ingredient.unit}>
                        {Object.entries(currentUnits).map(([key, obj]) => (
                            <option data-factor={obj.value} 
                                value={key} 
                                key={key}>{obj.abbrev}</option>
                            ))}
                    </select>
                </td>
                <td>
                    <input type="number"></input>
                </td>
            </tr>
        </tbody>
    )
}

export default RenderIngredient;