import gql from "graphql-tag";

export const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      _id
      content
    }
  }
`;
