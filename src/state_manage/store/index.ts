import { createStore } from "redux";
import tabReducer from "../reducers";

const store = createStore(tabReducer);

export default store;