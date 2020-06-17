import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Form, FormGroup, Row, Col } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";

import { todoActions } from "../../store/actions";
import { ADD_TODO } from "../../graphql/mutations";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [createTodo, createTodoRes] = useMutation(ADD_TODO);
  const [taskName, setTaskName] = useState("");

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
