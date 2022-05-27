import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Row, Col } from "react-bootstrap";
import UnitSelect from "../UnitSelect";
import { Ingredient } from "../Recipe/Ingredient";
import { Recipe } from "../Recipe/Recipe";


export interface IRecipeProp {
    recipe: Recipe
}

const RenderIngredient = observer(({ recipe }: IRecipeProp) => {

    const thisValue = (index: number): number => recipe.ingredients[index].returnSelected(recipe.state).value;
    
    const formatValue = (value: number): number | string => {

        if (value <= 0) return '';

        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    
    const handleChange = (ingredient: Ingredient, name: string) => (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        const unit = ingredient.returnSelected(recipe.state).unit;

        //update ingredient value
        if (name === 'value') ingredient.updateValue(recipe.state, unit, value);

        //update ingredient unit
        if (name === 'unit') ingredient.updateSelected(recipe.state, value);

        //update bakers percent
        if (name === 'percent') {};
    };

    return(
        <tr>
            {recipe.ingredients.map((ingredient: Ingredient, index) => (
            <div key={index}>
                <Row>
                    <td>{recipe.ingredients[index].name}</td>
                </Row>
                <Row>
                    <Col xs={9}>

                        <Row>

                            {/* render ingredient value */}
                            <Col xs={8}>
                                <Form>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="No Amt." 
                                        value={formatValue(thisValue(index))}
                                          
                                        onChange={handleChange(ingredient, 'value')}
                                    />
                                </Form>
                            </Col>

                            {/* render UnitSelect */}
                            <Col>
                                <div onChange={handleChange(ingredient, 'unit')}>
                                    <UnitSelect 
                                        recipe={recipe}
                                        ingredient={ingredient}
                                    />
                                </div>
                            </Col>

                        </Row>

                    </Col>

                    {/* percentage */}
                    <Col>
                        <Form.Control type="number" value={recipe.bakersPercent(index)} onChange={handleChange(ingredient, 'percent')}/>
                    </Col>

                </Row>  
            </div>     
            ))} 
        </tr>    
    )
})

export default RenderIngredient;