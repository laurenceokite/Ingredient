import React, { createContext, useContext } from "react";
import { useIngredientReducer } from './reducers';
import { Ingredient } from "../components/ViewEditRecipe/Ingredient";

const StoreContext = createContext<any|null>(null);
const { Provider } = StoreContext;

type GlobalSystems = 'metric' | 'us';
type GlobalUnits = 'weight' | 'volume';
type KeyOfIngredient = `${GlobalSystems}_${GlobalUnits}`;

interface GlobalStateInterface {
	globalUnit: GlobalUnits;
	globalSystem: GlobalSystems;
	recipeState: { 
		name: string;
		ingredients: Ingredient[],
		factor: number;
		anchorIndex: number;
	}
}

//Lifts Global State to StoreProvider El.
const StoreProvider = ({ value = [], ...props }) => {
	// Set default state here.
	const [state, dispatch] = useIngredientReducer({
		globalUnit: 'weight',
        globalSystem: 'metric',
		recipeState: { 
			name: '', 
			ingredients: [],
			factor: 1,
			anchorIndex: 0
		}
	});
	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext, GlobalSystems, GlobalUnits, GlobalStateInterface, KeyOfIngredient };