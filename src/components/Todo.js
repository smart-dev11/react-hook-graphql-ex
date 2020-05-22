import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import * as todoActions from "../actions";
import { TodoContext } from "./../contexts/todos";

const REMOVE_TODO = gql`
  mutation RemoveTodo($_id: String!) {
    deleteTodo(_id: $_id) {
      success
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($_id: ID!, $content: String!) {
    updateTodo(_id: $_id, content: $content) {
      _id
      content
    }
  }
`;

const Todo = ({ todo, checkEditRow, isEditing }) => {
  const [deleteTodo, deleteTodoRes] = useMutation(REMOVE_TODO);
  const [updateTodo, updateTodoRes] = useMutation(UPDATE_TODO);

  const { dispatch } = useContext(TodoContext);
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const { data } = deleteTodoRes;
    if (data && data.deleteTodo.success) {
      dispatch(todoActions.removeTodo(id));
    }
    return () => {};
  }, [deleteTodoRes.data]);

  useEffect(() => {
    const { data } = updateTodoRes;
    console.log(data);
    // if(data && data.updateTodo) {
    //   // dispatch(todoActions.removeTodo(id))
    // }
    return () => {};
  }, [updateTodoRes.data]);

  const removeTodo = (todo) => {
    setId(todo._id);
    deleteTodo({ variables: { _id: todo._id } });
  };

  const editTodo = (todo) => {
    setEditing({
      _id: todo._id,
      content: todo.content,
    });
    checkEditRow(todo._id);
  };

  const updateTodoHandle = () => {
    updateTodo({
      variables: {
        _id: editing._id,
        content: editing.content,
      },
    });

    setEditing(null);
    checkEditRow(null);
  };

  return (
    <tr>
      {isEditing === todo._id ? (
        <th scope="row">
          <Input
            type="text"
            value={editing.content}
            className="input-edit-content"
            onChange={(e) =>
              setEditing({
                _id: todo._id,
                content: e.target.value,
              })
            }
          />
        </th>
      ) : (
        <th scope="row">{todo.content}</th>
      )}
      <th>
        <Button type="button" color="danger" onClick={() => removeTodo(todo)}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </Button>
      </th>
      {isEditing === todo._id ? (
        <th>
          <Button
            type="button"
            color="success"
            onClick={() => updateTodoHandle()}
          >
            <i className="fa fa-check" aria-hidden="true"></i>
          </Button>
        </th>
      ) : (
        <th>
          <Button type="button" color="primary" onClick={() => editTodo(todo)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Button>
        </th>
      )}
    </tr>
  );
};

export default Todo;
