import React, { createContext, useContext } from "react";
import { useIngredientReducer } from './reducers';
import { Ingredient } from "../components/Recipe/Ingredient";

const StoreContext = createContext<any|null>(null);
const { Provider } = StoreContext;




interface GlobalStateInterface {
	recipeState: { 
	}
}

//Lifts Global State to StoreProvider El.
const StoreProvider = ({ value = [], ...props }) => {
	// Set default state here.
	const [state, dispatch] = useIngredientReducer({
		recipeState: { 
		}
	});
	return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext, GlobalStateInterface };