import React, { useState } from "react";
import { Form, Button, Stack, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";

import UnitSelect from "../UnitSelect";

import { Ingredient, IngredientDataInterface } from "../Recipe/Ingredient";
import { IRecipeComponent } from "../Recipe";
import './index.css'

const IngredientInput = observer(({ recipe }: IRecipeComponent) => {

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

    return (
        <Form as={Row} onSubmit={addIngredient} className='ingredient-input-form'>
                    
            <Form.Group>
                <Form.Control type="text" 
                    placeholder="Ingredient" 
                    id='ingredientNameInput'
                    name='name'
                    value={formState.name}
                    autoComplete="off" 
                    onChange={handleChange}
                />

                <Form.Control type="number" 
                    placeholder="Amount"
                    id='ingredientAmtInput'
                    name='value'
                    value={formState.value ? formState.value : ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <UnitSelect 
                    recipe={recipe}
                />
            </Form.Group>
            
            {/* Add Ingredient Button */}
            <Stack>
                <Button type="submit" variant='success'>Add Ingredient</Button>
            </Stack>
        </Form>
    );
});

export default IngredientInput;