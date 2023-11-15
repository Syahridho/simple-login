import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer/reducer";

const storeRedux = createStore(reducer, applyMiddleware(thunk));

export default storeRedux;
