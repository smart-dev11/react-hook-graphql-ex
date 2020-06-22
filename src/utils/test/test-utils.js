import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { render as rtlRender } from "@testing-library/react";
import rootReducer from "../../store/reducers";
import { PersistGate } from "redux-persist/es/integration/react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

export function makeStore(initialState) {
  return createStore(rootReducer, initialState);
}

export function testRender(
  ui,
  { initialState, store = makeStore(initialState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

export function testRenderWithProviders(ui, {}) {
  function Wrapper({ children }) {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>{children}</Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
