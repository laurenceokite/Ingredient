import React, { createContext, useContext } from "react";
import { useIngredientReducer } from './reducers';

const StoreContext = createContext();
const { Provider } = StoreContext;

//Lifts Global State to StoreProvider El.
const StoreProvider = ({ value = [], ...props }) => {
	// Set default state here.
	const [state, dispatch] = useIngredientReducer({
		globalUnit: 'weight',
        globalSystem: 'metric',
        autoConvert: false,
		recipeState: { 
			name: '', 
			ingredients: [],
			percent: 1
		}
	  });
	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };