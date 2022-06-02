import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col, Form, Stack } from 'react-bootstrap';

import { IRecipeComponent } from '../Recipe';
import './index.css'

const RecipeHeader = observer(({ recipe }: IRecipeComponent) => {

    const system = recipe.system;
    const units = recipe.units;

    const date = new Date();

    const handleChange = (event: React.FormEvent): void =>  {
        const { value, id } = event.target as HTMLFormElement;

        if (id === 'system') recipe.changeState( value, units );

        if (id === 'units') recipe.changeState( system, value );

        if (id === 'multiplier') recipe.updateMultiplier(value);

        if (id === 'yield') recipe.recipeYield = value;

        if (id === 'recipeName') recipe.name = value;
    } 

    //returns an array of numbers 1 through n
    const oneThrough = (max: number) => {
        const arr = [];

        for (let i = 1; i < max; i++) {
            arr.push(i);
        }

        return arr;
    }

    const option = (x: number | string): JSX.Element => {
        return (
            <option key={x} value={x}>{x}</option>
        );
    }

    return (
        <Form as={Row} className='recipe-header p-1'>

            {/* NAME */}
            <Stack className='mb-2 mt-1'>
                <Form.Control 
                    type='text' 
                    id='recipeName'
                    value={recipe.name && recipe.name} 
                    placeholder={`<Untitled> ${date.toLocaleString()}`}
                    onChange={handleChange}
                />
            </Stack>

            <Form.Group as={Col}>

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

            <Col>
                <Row>
                    <Col>
                        Yields:
                    </Col>

                    <Col>
                        <Form.Control
                            type='number'
                            id='yield'
                            value={recipe.recipeYield}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Multiplier
                    </Col>
                    
                    {/* MULTIPLIER */}
                    <Col>
                        <Form.Select
                            id='multiplier' 
                            defaultValue={recipe.multiplier} 
                            disabled={recipe.ingredients.length < 1}
                            onChange={handleChange}
                        >
                            {oneThrough(100).map(num => option(num))}
                        </Form.Select>
                    </Col>
                </Row>
            </Col>

        </Form>
    )
});

export default RecipeHeader;