import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { PersistGate } from "redux-persist/es/integration/react";
import { ConnectedRouter } from "react-router-redux";

import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import Todo from "./containers/Todo";
import configureStore, { history } from "./store/createStore";
import PrivateRoute from "./route-helpers/PrivateRoute";
import GuestRoute from "./route-helpers/GuestRoute";

const { persistor, store } = configureStore();

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading="Loading..." persistor={persistor}>
        <Router history={history}>
          <Switch>
            <GuestRoute exact path="/login" component={Login}></GuestRoute>
            <GuestRoute
              exact
              path="/register"
              component={Register}
            ></GuestRoute>
            <PrivateRoute exact path="/" component={Todo}></PrivateRoute>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  </ApolloProvider>
);

export default App;
