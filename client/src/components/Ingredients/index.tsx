import React from "react";
import { observer } from "mobx-react-lite";
import { Table } from "react-bootstrap";

import { Ingredient } from "../Recipe/Ingredient";
import { IRecipeComponent } from "../Recipe";
import './index.css'
import RenderIngredient from "./RenderIngredient";

const Ingredients = observer(({ recipe }: IRecipeComponent) => {

    const handleChange = (name: string, index: number) => (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        const ingredient = recipe.ingredients[index];

        const unit = ingredient.returnSelected(recipe.state).unit;

        //update ingredient value
        if (name === 'value') ingredient.updateValue(recipe.state, unit, value);

        //update ingredient unit
        if (name === 'unit') ingredient.updateSelected(recipe.state, value);

        //update bakers percent
        if (name === 'percent') recipe.bakersPercent(index, value);

        //update anchor index
        if (name === 'anchor') recipe.anchorIndex = index;

        //remove ingredient from array
        if (name === 'remove') recipe.removeIngredient(index);
    };

    if (!recipe.ingredients.length) {
        return(
            <div className="no-ingredients bg-light text-secondary d-flex align-items-center justify-content-center mt-2">
                No Ingredients.
            </div>
        )
    };

    return(
        <Table striped bordered>
            <tbody>
                {recipe.ingredients.map((ingredient, index) => (
                    <RenderIngredient recipe={recipe} handleChange={handleChange} index={index} key={index}/>
                ))} 
            </tbody>
        </Table>
    )
})

export default Ingredients;