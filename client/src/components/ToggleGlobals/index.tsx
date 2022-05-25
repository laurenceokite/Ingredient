import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Form } from 'react-bootstrap';

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
    }

    return (
        <Form as={Row} className='toggle-measure'> 
            {/* Measurement Options */}
            <Form.Group>
                {/* system */}
                <Form.Select id='system' onChange={handleChange}>
                    <option value="metric">METRIC</option>
                    <option value="us">US</option>
                </Form.Select>
                {/* type */}
                <Form.Select id='units' onChange={handleChange}>
                        <option value="weight">WEIGHT</option>
                        <option value="volume">VOLUME</option>
                </Form.Select>
            </Form.Group>
            <div>
                <Form.Control type='number' placeholder='1'></Form.Control>
            </div>
        </Form>
    )
});

export default ToggleGlobals;