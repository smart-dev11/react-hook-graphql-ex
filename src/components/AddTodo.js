import React, { useState, useContext } from 'react';
import { Button, Input, Form, FormGroup, Row, Col } from 'reactstrap';

import * as todoActions from '../actions';
import { TodoContext } from './../contexts/todos';

export default function AddTodo() {

  const [taskName, setTaskName] = useState('')
  const { dispatch } = useContext(TodoContext);

  const submitHandle = (e) => {
    e.preventDefault()
    if (!taskName.trim()) {
      return
    }

    dispatch(todoActions.addTodo(taskName))
    setTaskName('')
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
