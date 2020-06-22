import React from "react";
import { Provider } from "react-redux";
import { Router, Switch } from "react-router";
import { shallow, mount } from "enzyme";
import { render, fireEvent, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureStore from "redux-mock-store";
import { ApolloProvider } from "@apollo/react-hooks";
import { MockedProvider } from "@apollo/react-testing";
import ApolloClient from "apollo-boost";
import { createMemoryHistory } from "history";

import { LOGIN } from "../graphql/mutations";
import LoginComponent from "../containers/auth/Login";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/api",
});

describe("LoginComponent", () => {
  const initialState = { isAuthenticated: null };
  const mockStore = configureStore();
  let store, wrapper;
  const history = createMemoryHistory();

  it("should render correctly", () => {
    store = mockStore(initialState);
    wrapper = shallow(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should show email after typing", () => {
    const component = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <LoginComponent />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );

    const { getByLabelText } = component;
    const emailInput = getByLabelText("Email:");
    fireEvent.change(emailInput, {
      target: { value: "admin@admin.com" },
    });

    expect(emailInput.value).toEqual("admin@admin.com");
  });

  it("should show Password after typing", () => {
    const component = render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <LoginComponent />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );

    const { getByLabelText } = component;
    const passwordInput = getByLabelText("Password:");
    fireEvent.change(passwordInput, {
      target: { value: "admin123" },
    });

    expect(passwordInput.value).toEqual("admin123");
  });

  it("should submit when data filled", async () => {
    const onSubmit = jest.fn();

    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: { email: "admin@admin.com", password: "admin123" },
        },
        result: {
          data: {
            logIn: {
              _id: "5ee8ef92ca15054b1c66625c",
              email: "admin@admin.com",
            },
          },
        },
      },
    ];

    const component = render(
      <MockedProvider client={client} mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <LoginComponent onSubmitHandle={onSubmit} />
            </Switch>
          </Router>
        </Provider>
      </MockedProvider>
    );

    const { getByLabelText, getByTestId, getByText } = component;

    const emailInput = getByLabelText("Email:");
    fireEvent.change(emailInput, {
      target: { value: "admin@admin.com" },
    });

    const passwordInput = getByLabelText("Password:");
    fireEvent.change(passwordInput, {
      target: { value: "admin123" },
    });

    await act(async () => {
      fireEvent.submit(getByText("Login"));
    });

    expect(onSubmit).toBeCalled();
  });
});
