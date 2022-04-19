import React, { useState } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { CHANGE_GLOBAL_UNIT, CHANGE_GLOBAL_SYSTEM, TOGGLE_AUTO_CONVERT } from '../../utils/actions';

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
    }

    //Metric or Imperial
    function handleSystemChange(event) {
        const value = event.target.value;
        dispatch({
            type: CHANGE_GLOBAL_SYSTEM,
            globalSystem: value
        }); 
    }

    //Toggle autoconvert on and off
    function handleToggleAutoConvert() {
        dispatch({
            type: TOGGLE_AUTO_CONVERT,
            autoConvert: !state.autoConvert
        })
    }

    return (
        <form> 
            {/* Measurement Options */}
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
            <label htmlFor="autoConvertToggle">autoconvert</label>
            <input type="checkbox" id="autoConvertToggle" onChange={handleToggleAutoConvert}></input>
        </form>
    )
}

export default ToggleMeasure;