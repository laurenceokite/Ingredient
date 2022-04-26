import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import returnIngredient from "./returnIngredient";

function RenderIngredient({ data, currentUnits }) {
    const [ state ] = useStoreContext();
    const { globalUnit: unit, globalSystem: system } = state;

    const [ requested, setRequested ] = useState();

    const ingredient = returnIngredient(data, unit, system, requested);

    useEffect(() => {
        setRequested();
    })

    const handleUnitChange = event => {
        const value = event.target.value;
        setRequested(value);
    }

    return(
        <div>
            <div>{ingredient.name}</div>
            <div>
                {  ingredient.measurement
                    ? (<div>{ingredient.measurement}</div>)
                    : (<form>
                        <input type="text" placeholder="No Amt."/>
                    </form>)
                }        
            </div>
            <div id='unitSelect'>
                <select onChange={handleUnitChange} name='unit' defaultValue={ingredient.unit}>
                    {Object.entries(currentUnits).map(([key, obj]) => (
                        <option data-factor={obj.value} 
                            value={key} 
                            key={key}>{obj.abbrev}</option>
                        ))}
                </select>
            </div>
        </div>
    )
}

export default RenderIngredient;