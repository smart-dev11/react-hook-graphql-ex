import React, { useContext } from 'react';
import { Button } from 'reactstrap';

import * as todoActions from '../actions';
import { TodoContext } from './../contexts/todos';

const Todo = ({todo}) => {
  const { dispatch } = useContext(TodoContext);

  const removeTodo = (todo) => {
    dispatch(todoActions.removeTodo(todo.id))
  }

  return (
    <tr>
      <td scope="row">{todo.text}</td>
      <td>
        <Button type="button" color="danger" onClick={() => removeTodo(todo)}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </Button>
      </td>
    </tr>
  )
}

export default Todo;