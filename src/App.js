import React from "react";
import { Router, Route, Switch } from "react-router";
// import createHistory from "history/createBrowserHistory";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "connected-react-router";

import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import configureStore, { history } from "./store";

const { persistor, store } = configureStore();

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

// const store = createStore(rootReducer);
// const history = createHistory();
const App = () => (
  <ApolloProvider store={store} client={client}>
    <PersistGate loading="Loading..." persistor={persistor}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </Router>
    </PersistGate>
  </ApolloProvider>
);

export default App;
