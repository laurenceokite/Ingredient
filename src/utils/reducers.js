import { useReducer } from 'react';

import {
    CHANGE_MEASURE_SYSTEM,
    CHANGE_MEASURE_TYPE,
    TOGGLE_AUTO_CONVERT
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_MEASURE_TYPE:
            return {
                ...state,
                measurementType: action.measurementType
            }
        case CHANGE_MEASURE_SYSTEM:
            return {
                ...state,
                measurementSystem: action.measurementSystem
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