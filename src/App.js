import React from "react";
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

const { persistor, store } = configureStore();

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

const App = () => (
  <ApolloProvider store={store} client={client}>
    <PersistGate loading="Loading..." persistor={persistor}>
      <Router history={history}>
        <React.Fragment>
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" component={Todo}></Route>
            {/* <PrivateRoute exact path="/" component={Todo}></PrivateRoute> */}
          </Switch>
        </React.Fragment>
      </Router>
    </PersistGate>
  </ApolloProvider>
);

export default App;
