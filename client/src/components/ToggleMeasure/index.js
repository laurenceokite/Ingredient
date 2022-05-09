import React, { useState } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { CHANGE_GLOBAL_UNIT, CHANGE_GLOBAL_SYSTEM, TOGGLE_AUTO_CONVERT } from '../../utils/actions';
import './index.css'

function ToggleMeasure() {
    const [ state, dispatch ] = useStoreContext();

    //Each time form is changed, update GlobalState
    //Weight or Volume
    function handleUnitChange(event) {
        const value = event.target.value;
        dispatch({
            type: CHANGE_GLOBAL_UNIT,
            globalUnit: value
        });
        console.log(state, value);
    }

    //Metric or Imperial
    function handleSystemChange(event) {
        const value = event.target.value;
        dispatch({
            type: CHANGE_GLOBAL_SYSTEM,
            globalSystem: value
        }); 
    }

    return (
        <form className='toggle-measure'> 
            {/* Measurement Options */}
            <div>
                {/* system */}
                <select onChange={handleSystemChange}>
                    <option value="metric">M</option>
                    <option value="us">US</option>
                </select>
                {/* type */}
                <select onChange={handleUnitChange}>
                        <option value="weight">WEIGHT</option>
                        <option value="volume">VOLUME</option>
                </select>
            </div>
            <div className='edit-percent'>
                <input type='number' defaultValue={state.recipeState.percent} placeholder='100'></input>
                <a> X</a>
            </div>
        </form>
    )
}

export default ToggleMeasure;