import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Row, Col, Button, Table, Stack } from "react-bootstrap";
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

    
    const handleChange = (ingredient: Ingredient, name: string, index: number) => (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        const unit = ingredient.returnSelected(recipe.state).unit;

        //update ingredient value
        if (name === 'value') ingredient.updateValue(recipe.state, unit, value);

        //update ingredient unit
        if (name === 'unit') ingredient.updateSelected(recipe.state, value);

        //update bakers percent
        if (name === 'percent') recipe.bakersPercent(index, value);

        //update anchor index
        if (name === 'anchor') recipe.anchorIndex = index;
    };

    return(
        <tr>
            {recipe.ingredients.map((ingredient: Ingredient, index) => (
            <div key={index}>
                <Row>
                    <td>{recipe.ingredients[index].name}</td>
                </Row>
                <Row>
                    <Col xs={6}>

                        <Row>

                            {/* render ingredient value */}
                            <Col xs={6}>
                                <Form>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="No Amt." 
                                        value={formatValue(thisValue(index))}
                                        onChange={handleChange(ingredient, 'value', index)}
                                    />
                                </Form>
                            </Col>

                            {/* render UnitSelect */}
                            <Col xs={6}>
                                <div onChange={handleChange(ingredient, 'unit', index)}>
                                    <UnitSelect 
                                        recipe={recipe}
                                        ingredient={ingredient}
                                    />
                                </div>
                            </Col>

                        </Row>

                    </Col>

                    {/* percentage */}
                    <Col xs={4} sm={3}>
                       <Stack direction="horizontal">
                            <Form.Control 
                            type="number" 
                            value={formatValue(recipe.bakersPercent(index))} 
                            onChange={handleChange(ingredient, 'percent', index)}
                            disabled={recipe.anchorIndex === index}
                            />
                            <div>&nbsp;%</div>
                       </Stack>
                    </Col>
                    <Col xs={1}>
                        <Button 
                        variant={recipe.anchorIndex === index ? 'outline-success' : 'outline-secondary'}
                        size='sm'
                        onClick={handleChange(ingredient, 'anchor', index)}
                        >
                            1:1
                        </Button>
                    </Col>
                </Row>  
            </div>     
            ))} 
        </tr>    
    )
})

export default RenderIngredient;