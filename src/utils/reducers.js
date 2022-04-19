import { useReducer } from 'react';

import {
    CHANGE_GLOBAL_SYSTEM,
    CHANGE_GLOBAL_UNIT,
    TOGGLE_AUTO_CONVERT
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_GLOBAL_UNIT:
            return {
                ...state,
                globalType: action.globalType
            }
        case CHANGE_GLOBAL_SYSTEM:
            return {
                ...state,
                globalSystem: action.globalSystem
            }
        case TOGGLE_AUTO_CONVERT:
            return {
                ...state,
                autoConvert: action.autoConvert
            }
    }
}

export function useIngredientReducer(initialState) {
	return useReducer(reducer, initialState);
}