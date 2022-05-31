import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Form, Stack } from 'react-bootstrap';

import { Recipe } from '../Recipe/Recipe';

interface IToggleGlobals {
    recipe: Recipe;
}

const ToggleGlobals = observer(({ recipe }: IToggleGlobals) => {

    const system = recipe.system;
    const units = recipe.units;

    const handleChange = (event: React.FormEvent): void =>  {
        const { value, id } = event.target as HTMLFormElement;

        if (id === 'system') recipe.changeState( value, units );

        if (id === 'units') recipe.changeState( system, value );

        if (id === 'multiplier') recipe.updateMultiplier(value);

        if (id === 'yield') recipe.recipeYield = value;
    } 

    //returns an array of numbers 1 through n
    const oneThrough = (max: number) => {
        const arr = [];

        for (let i = 1; i < max; i++) {
            arr.push(i);
        }

        return arr;
    }

    const options = (x: number | string): JSX.Element => {
        return (
            <option key={x} value={x}>{x}</option>
        );
    }

    return (
        <Form as={Row} className='toggle-measure'> 
            <Form.Group>

                {/* SYSTEM */}
                <Form.Select id='system' onChange={handleChange}>
                    <option value="metric">METRIC</option>
                    <option value="us">US</option>
                </Form.Select>

                {/* UNITS */}
                <Form.Select id='units' onChange={handleChange}>
                        <option value="weight">WEIGHT</option>
                        <option value="volume">VOLUME</option>
                </Form.Select>

            </Form.Group>

            <Stack direction='horizontal'>
                <p>
                    Yields
                </p>

                <Form.Control 
                    type='number'
                    id='yield'
                    value={recipe.recipeYield}
                    onChange={handleChange}
                />

                {recipe.name && 
                    <div>{recipe.name}</div>
                }
            </Stack>

            <Stack direction='horizontal'>
                <p>
                    Multiplier
                </p>
                
                {/* MULTIPLIER */}
                <Form.Select
                    id='multiplier' 
                    defaultValue={recipe.multiplier} 
                    disabled={recipe.ingredients.length < 1}
                    onChange={handleChange}
                >
                    {oneThrough(100).map(num => options(num))}
                </Form.Select>
            </Stack>
        </Form>
    )
});

export default ToggleGlobals;