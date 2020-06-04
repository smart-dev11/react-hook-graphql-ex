import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Router, Route } from "react-router";
import createHistory from "history/createBrowserHistory";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import App from "./App";
import Login from "./containers/auth/Login";
import Register from "./containers/auth/Register";
import rootReducer from "./reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

const store = createStore(rootReducer);
const history = createHistory();
render(
  <ApolloProvider store={store} client={client}>
    <Router history={history}>
      {/* <Route path="/" component={App}></Route> */}
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
