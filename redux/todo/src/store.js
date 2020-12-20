import { createStore } from "redux";
import rootReducer from "./app/reducers";

const store = createStore(rootReducer);

export default store;
