import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Row, Col, Button, Stack, CloseButton } from "react-bootstrap";

import { IRecipeComponent } from "../Recipe";
import UnitSelect from '../UnitSelect';

interface IRenderIngredient extends IRecipeComponent{
    handleChange: Function,
    index: number
}

const RenderIngredient = observer(({ recipe, handleChange, index }: IRenderIngredient) => {

    const ingredient = recipe.ingredients[index];

    const thisValue = recipe.ingredients[index].returnSelected(recipe.state).value;

    const formatValue = (value: number): number | string => {

        if (value <= 0) return '';
    
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }

    return (
        <tr key={index}>
            <td>
                <Row className="ingredient-title align-items-center">
                    <Col>
                        <div>{recipe.ingredients[index].name}</div>
                    </Col>

                    <Col xs={5}>
                        <Row className="ingredient-buttons align-items-center">
                            <Col>
                                <Button 
                                    className="anchor-button"
                                    variant={recipe.anchorIndex === index ? 'success' : 'outline-secondary'}
                                    size='sm'
                                    onClick={handleChange('anchor', index)}
                                >
                                    100%
                                </Button>
                            </Col>
                        
                            <Col>
                                <CloseButton 
                                    className="ingredient-close" 
                                    onClick={handleChange('remove', index)}
                                />
                            </Col>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Col xs={7} sm={9}>

                        <Row>

                            {/* render ingredient value */}
                            <Col xs={8}>
                                <Form>
                                    <Form.Control 
                                        size="sm"
                                        type="number" 
                                        placeholder="No Amt." 
                                        value={formatValue(thisValue)}
                                        onChange={handleChange('value', index)}
                                    />
                                </Form>
                            </Col>

                            {/* render UnitSelect */}
                            <Col xs={4} className="unit-select">

                                <UnitSelect 
                                    recipe={recipe}
                                    ingredient={ingredient}
                                />

                            </Col>

                        </Row>

                    </Col>

                    {/* percentage */}
                    <Col xs={5} sm={3}>
                       <Stack direction="horizontal">
                            <Form.Control 
                                size="sm"
                                type="number" 
                                value={formatValue(recipe.bakersPercent(index))} 
                                onChange={handleChange(ingredient, 'percent', index)}
                                disabled={recipe.anchorIndex === index}
                            />
                            <div>&nbsp;%</div>
                       </Stack>
                    </Col>

                </Row>
            </td> 
        </tr> 
    )
});

export default RenderIngredient;