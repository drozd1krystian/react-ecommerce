import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import thunk from "redux-thunk";
import createSagaMiddle from "redux-saga";

const sagaMiddleware = createSagaMiddle();
export const middlewares = [thunk, logger, sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

export default store;
