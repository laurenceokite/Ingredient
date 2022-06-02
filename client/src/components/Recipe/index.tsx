import React from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Container } from 'react-bootstrap';

import RecipeHeader from '../RecipeHeader';
import Ingredients from '../Ingredients';
import IngredientInput from '../IngredientInput';

import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';
import './index.css';

interface IRecipeComponent {
    recipe: Recipe,
    ingredient?: Ingredient
}

const DisplayRecipe = observer(() => {

    const recipe = useLocalObservable(() => new Recipe('metric', 'weight', 0, 1));

    return(
        <Container fluid>

            <RecipeHeader recipe={recipe}/>

            <Ingredients recipe={recipe}/>   
        
            <IngredientInput recipe={recipe}/>
            
        </Container>
    )
});



export { DisplayRecipe as default, IRecipeComponent};