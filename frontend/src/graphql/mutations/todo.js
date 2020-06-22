import gql from "graphql-tag";

export const ADD_TODO = gql`
  mutation AddTodo($content: String!) {
    createTodo(content: $content) {
      _id
      content
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($_id: String!) {
    deleteTodo(_id: $_id) {
      success
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($_id: ID!, $content: String!) {
    updateTodo(_id: $_id, content: $content) {
      _id
      content
    }
  }
`;
