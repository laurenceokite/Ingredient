import { StoreProvider } from './utils/GlobalState';

import ViewEditRecipe from "./components/Recipe";

function App() {

  return (
    <StoreProvider>
        <ViewEditRecipe/>
    </StoreProvider>
  );
}

export default App;
