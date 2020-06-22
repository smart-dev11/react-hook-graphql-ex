import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";

import { todoActions } from "../../store/actions";
import { UPDATE_TODO, REMOVE_TODO } from "../../graphql/mutations";

const Todo = ({ index, todo, checkEditRow, isEditing }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(null);

  const [deleteTodo, deleteTodoRes] = useMutation(REMOVE_TODO);
  const [updateTodo, updateTodoRes] = useMutation(UPDATE_TODO);

  useEffect(() => {
    const { data } = deleteTodoRes;
    if (data && data.deleteTodo.success) {
      dispatch(todoActions.removeTodo(id));
    }
    return () => {};
  }, [deleteTodoRes.data]);

  useEffect(() => {
    const { data } = updateTodoRes;
    if (data && data.updateTodo) {
      dispatch(todoActions.updateTodo(data.updateTodo));
    }
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
      <th>{index + 1}</th>
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
