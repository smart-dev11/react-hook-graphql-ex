import React, { useState, useContext, useEffect } from "react";
import { Button, Input, Form, FormGroup, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import * as todoActions from "../../store/actions";
import { TodoContext } from "../../contexts/todos";

const ADD_TODO = gql`
  mutation AddTodo($content: String!) {
    createTodo(content: $content) {
      _id
      content
    }
  }
`;

export default function AddTodo() {
  const [createTodo, createTodoRes] = useMutation(ADD_TODO);
  const [taskName, setTaskName] = useState("");
  const { dispatch } = useContext(TodoContext);

  useEffect(() => {
    const { data } = createTodoRes;
    if (data) {
      dispatch(todoActions.addTodo(data.createTodo));
    }

    return () => {};
  }, [createTodoRes.data]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (!taskName.trim()) {
      return;
    }

    createTodo({ variables: { content: taskName } });

    setTaskName("");
  };

  return (
    <Row>
      <Col sm={12}>
        <Form onSubmit={submitHandle} className="add-todo-form">
          <FormGroup>
            <Input
              name="taskName"
              value={taskName}
              placeholder="Enter new task"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </FormGroup>
          <Button color="primary" type="submit" className="btn-create-task">
            Create new task
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
