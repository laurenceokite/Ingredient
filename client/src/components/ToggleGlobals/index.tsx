import React, { useState } from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import './index.css'
import { Recipe } from '../Recipe/Recipe';

const ToggleGlobals = ( recipe: Recipe ) => {
    const [ state, dispatch ] = useStoreContext();

    const handleChange = (event: React.FormEvent): void =>  {
        const { value } = event.target as HTMLFormElement;
        recipe.changeState(value);
    }

    return (
        <form className='toggle-measure'> 
            {/* Measurement Options */}
            <div>
                {/* system */}
                <select onChange={handleChange}>
                    <option value="metric">M</option>
                    <option value="us">US</option>
                </select>
                {/* type */}
                <select onChange={handleChange}>
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

export default ToggleGlobals;