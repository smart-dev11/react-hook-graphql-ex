import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import App from "./App";
import rootReducer from "./reducers";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

const store = createStore(rootReducer);

render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
