import React, { useState, useContext, useRef } from 'react';
import { Button, Input, Form, FormGroup, Row, Col } from 'reactstrap';

import * as todoActions from '../actions';
import { TodoContext } from './../contexts/todos';

export default function AddTodo() {

  const [taskName, setTaskName] = useState('')
  const { dispatch } = useContext(TodoContext);
  const inputEl = useRef(null);

  const submitHandle = (e) => {
    inputEl.current.focus();
    e.preventDefault();
    if (!taskName.trim()) {
      return
    }

    dispatch(todoActions.addTodo(taskName));
    setTaskName('');
  }

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={submitHandle} className="add-todo-form">
          <FormGroup>
            <Input
              name="taskName"
              value={taskName}
              placeholder='Enter new task'
              onChange={e => setTaskName(e.target.value)}
              ref={inputEl}
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Create new task
          </Button>
        </Form>
      </Col>
    </Row>
  )
}
