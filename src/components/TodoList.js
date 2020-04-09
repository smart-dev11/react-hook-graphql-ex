import React, { useContext } from 'react';
import { Table } from 'reactstrap';

import Todo from './Todo';
import { TodoContext } from './../contexts/todos';

export default function TodoList()  {
  const { state } = useContext(TodoContext);
  const { todos } = state;

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Task List</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.todoLists.map((todo) =>
          <Todo key={todo.id} todo={todo} />
        )}
      </tbody>
    </Table>
  )
}
