import React from "react";
import { UnitInterface, Ingredient } from "../ViewEditRecipe/Ingredient";
import { KeyOfIngredient } from "../../utils/GlobalState";

interface UnitSelectInterface {
    currentUnits: UnitInterface[];
    selectedUnit: UnitInterface;
    ingredient: Ingredient;
    keyOfIngredient: KeyOfIngredient;
}

const UnitSelect = ({ currentUnits, selectedUnit, ingredient, keyOfIngredient }: UnitSelectInterface) => {

    const handleChangeUnit = (event: React.FormEvent): void => {
        const { value } = event.target as HTMLFormElement;
        ingredient.updateSelected(keyOfIngredient, value);
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