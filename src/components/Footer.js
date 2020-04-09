import React, { useContext } from 'react';
import { Button, Row, Col } from 'reactstrap';

import * as todoActions from '../actions';
import { TodoContext } from './../contexts/todos';

export default function Footer()  {
  const { dispatch } = useContext(TodoContext);

  const clearTodo = () => {
    dispatch(todoActions.clearTodo())
  }

  const resetTodo = () => {
    dispatch(todoActions.resetTodo())
  }

  return (
    <Row>
      <Col sm={12}>
        <Button color="info" type="button" onClick={() => clearTodo()}>Clear Tasks</Button>
        <Button color="info" type="button" className="btn btn-reset" onClick={() => resetTodo()}>Reset Tasks</Button>
      </Col>
    </Row>
  )
}
