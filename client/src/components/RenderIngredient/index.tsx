import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Row, Col } from "react-bootstrap";

import UnitSelect from "../UnitSelect";
import { Ingredient } from "../Recipe/Ingredient";
import { Recipe } from "../Recipe/Recipe";


interface RenderIngredientInterface {
    ingredient: Ingredient,
    recipe: Recipe
}

const RenderIngredient = observer(({ ingredient, recipe }: RenderIngredientInterface) => {

    const thisUnit = ingredient.returnSelected(recipe.state).unit;
    const thisValue = ingredient.returnSelected(recipe.state).value;

    //update ingredient unit
    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        ingredient.updateSelected(recipe.state, value);
    }

    //update ingredient value
    const handleChangeValue = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;

        ingredient.updateValue(recipe.state, thisUnit, value);
        recipe.getBakersPercents(); //get new bakers percentages
    }

    //update bakers percent
    const handleChangePercent = (event: React.FormEvent): void => {

    } 
    
    return(
        <tr>
            <Row>
                <td className="ingredient-name">{ingredient.name}</td>
            </Row>
            <Row>
                <Col xs={9}>

                    <Row>

                        {/* render ingredient value */}
                        <Col xs={8}>
                            <Form>
                                <Form.Control 
                                    type="text" 
                                    placeholder="No Amt." 
                                    value={thisValue ? thisValue : ''} 
                                    onChange={handleChangeValue}
                                />
                            </Form>
                        </Col>

                        {/* render UnitSelect */}
                        <Col>
                            <div onChange={handleChangeUnit}>
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
                    <Form.Control type="number" value={ingredient.bakersPercentage} onChange={handleChangePercent}/>
                </Col>

            </Row>
        </tr> 
    )
})

export default RenderIngredient;