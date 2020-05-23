import React, { useState, useContext, useEffect } from "react";
import { Table } from "reactstrap";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";

import Todo from "./Todo";
import * as todoActions from "../actions";
import { TodoContext } from "./../contexts/todos";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      _id
      content
    }
  }
`;

export default function TodoList() {
  const [getTodos, getTodosRef] = useLazyQuery(GET_TODOS);
  const { state, dispatch } = useContext(TodoContext);
  const [isEditing, setIsEditingg] = useState(null);
  const { todos } = state;

  useEffect(() => {
    if (getTodosRef.data)
      dispatch(todoActions.getTodos(getTodosRef.data.getTodos));
    return () => {};
  }, [getTodosRef.data]);

  useEffect(() => {
    getTodos();

    return () => {};
  }, []);

  const checkEditRow = (_id) => {
    setIsEditingg(_id);
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>No</th>
          <th>Task List</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {todos.todoLists.map((todo, index) => (
          <Todo
            key={todo._id}
            todo={todo}
            checkEditRow={checkEditRow}
            isEditing={isEditing}
            index={index}
          />
        ))}
      </tbody>
    </Table>
  );
}
