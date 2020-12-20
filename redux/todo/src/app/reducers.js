import { combineReducers } from "redux";

import { todosReducer } from "./todos";
import filtersReducer from "./filters";

// Note that each of these reducers is managing its own part of the global state.
// The state parameter is different for every reducer, and corresponds to the part of the state it manages.
const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;
