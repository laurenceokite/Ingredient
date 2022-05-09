import { useReducer } from 'react';
import { GlobalStateInterface } from './GlobalState';

import {
    CHANGE_GLOBAL_SYSTEM,
    CHANGE_GLOBAL_UNIT,
    TOGGLE_AUTO_CONVERT,
    EDIT_RECIPE
} from './actions'


export const reducer = (state: GlobalStateInterface, action: any) => {
    switch (action.type) {
        case CHANGE_GLOBAL_UNIT:
            return {
                ...state,
                globalUnit: action.globalUnit
            }
        case CHANGE_GLOBAL_SYSTEM:
            return {
                ...state,
                globalSystem: action.globalSystem
            }
        case EDIT_RECIPE:
            return {
                ...state,
                recipeState: action.recipeState
            }
    }
}

export function useIngredientReducer(initialState: GlobalStateInterface) {
	return useReducer<any>(reducer, initialState);
}