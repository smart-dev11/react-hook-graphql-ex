import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { useLazyQuery } from "@apollo/react-hooks";

import Todo from "./Todo";
import { todoActions } from "../../store/actions";
import { GET_TODOS } from "../../graphql/queries";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [isEditing, setIsEditingg] = useState(null);
  const [getTodos, getTodosRef] = useLazyQuery(GET_TODOS);

  useEffect(() => {
    if (getTodosRef.data)
      dispatch(todoActions.getTodos(getTodosRef.data.getTodos));

    return () => {};
  }, [getTodosRef.data]);

  useEffect(() => {
    console.log(123123123123);
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
