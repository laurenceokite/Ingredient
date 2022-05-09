import React from "react";
import { UnitInterface, Ingredient } from "../Recipe/Ingredient";
import { State } from '../Recipe/Recipe'

interface UnitSelectInterface {
    currentUnits: UnitInterface[];
    selectedUnit: UnitInterface;
    ingredient: Ingredient;
    state: State;
}

const UnitSelect = ({ currentUnits, selectedUnit, ingredient, state }: UnitSelectInterface) => {

    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;
        ingredient.updateSelected(state, value);
    }
    
    return (
        <select name='unit' defaultValue={selectedUnit.unit} onChange={handleChangeUnit}>
            {currentUnits.map(unit => (
                <option key={unit.unit} value={unit.unit}>
                        {unit.abbrev}
                </option>
            ))}

        </select>
    );
}

export default UnitSelect;