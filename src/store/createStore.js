import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { connectRouter } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

import reducers from "./reducers";
import sagas from "./sagas";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistCombineReducers(persistConfig, {
  ...reducers,
  router: connectRouter(history),
});

const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

// Redux Dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const enhancers = [applyMiddleware(sagaMiddleware, routingMiddleware)];

  // Create store
  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  // Persist store
  const persistor = persistStore(store);

  // Run sagas
  sagaMiddleware.run(sagas);

  return { persistor, store };
};
