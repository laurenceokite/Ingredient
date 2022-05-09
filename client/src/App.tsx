import { StoreProvider } from './utils/GlobalState';

import ViewEditRecipe from "./components/ViewEditRecipe";

function App() {

  return (
    <StoreProvider>
        <ViewEditRecipe/>
    </StoreProvider>
  );
}

export default App;
