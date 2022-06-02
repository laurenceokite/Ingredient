import React from "react";
import { observer } from "mobx-react-lite";
import { Form } from "react-bootstrap";

import { IRecipeComponent } from "../Recipe";

const UnitSelect = observer(({ recipe, ingredient }: IRecipeComponent) => {
    //mobx observer needs the whole observed object 
    const { state } = recipe;

    //if it is an ingredient, pass ingredient data, otherwise use empty ingredient in recipe.data
    const data = ingredient || recipe.data;

    const selectedUnit = data.returnSelected(state).unit;
    const currentUnits = data.returnCurrentUnits(state);

    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;
        
        data.updateSelected(state, value);
    }

    return (
        <Form.Select size="sm" name='unit' value={selectedUnit} onChange={handleChangeUnit}>
            {currentUnits.map(unit => (
                <option key={unit.unit} value={unit.unit}>
                        {unit.abbrev}
                </option>
            ))}

        </Form.Select>
    );
});

export default UnitSelect;