import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Container, Form, Table, Stack, Button } from 'react-bootstrap';

import ToggleGlobals from '../ToggleGlobals';
import RenderIngredient from '../RenderIngredient';
import UnitSelect from '../UnitSelect';

import { Ingredient, IngredientDataInterface } from './Ingredient';
import { Recipe } from './Recipe';

const DisplayRecipe = observer(() => {

    const recipe = useLocalObservable(() => new Recipe('metric', 'weight', 0));

    const { state, data } = recipe;

    const selectedUnit = data.returnSelected(state).unit;

    //form data is collected in the shape of new Ingredient params
    const formInitialState = { 
        name: '',
        value: 0,
        unit: selectedUnit,
        state: state
    }

    //declare form state
    const [formState, setFormState] = useState<IngredientDataInterface>(formInitialState);

    //add new Ingredient to Recipe object
    const addIngredient = (event: React.FormEvent): void => {
        event.preventDefault();

        formState.unit = selectedUnit;
        
        recipe.addIngredient(new Ingredient(formState))

        // Reset ingredient input form to original state
        setFormState(formInitialState);
    };

    const handleChange = (event: React.FormEvent): void => {
        const { value, name } = event.target as HTMLFormElement;

        setFormState({
          ...formState,
          [name]: value
        });
    };

    return(
        <Container fluid='md'>
            {/* Change measurement type here */}
            <ToggleGlobals recipe={recipe}/>

            {/* Map array of ingredients */}
            <Table striped bordered>
                <tbody>
                    <RenderIngredient recipe={recipe}/>   
                </tbody>
            </Table>

            {/* Ingredient Input */}
            <Form onSubmit={addIngredient}>
                
                <Form.Group>
                    <Form.Control type="text" 
                        placeholder="Ingredient" 
                        id='ingredientNameInput'
                        name='name'
                        value={formState.name}
                        autoComplete="off" 
                        onChange={handleChange}/>

                    <Form.Control type="number" 
                        placeholder="Amount"
                        id='ingredientAmtInput'
                        name='value'
                        value={formState.value?formState.value:''}
                        onChange={handleChange}
                        autoComplete="off"/>
                </Form.Group>

                <Stack>

                    <UnitSelect 
                        recipe={recipe}
                    />

                    {/* Add Ingredient Button */}
                    <Button type="submit">Add Ingredient</Button>
                </Stack>
            </Form>
        </Container>
    )
});



export default DisplayRecipe;