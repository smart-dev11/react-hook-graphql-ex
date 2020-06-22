import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      _id
      email
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      _id
      email
    }
  }
`;
