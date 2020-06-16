import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col,
  Alert,
} from "reactstrap";
import * as _ from "lodash";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { loginFormValidate } from "../../helpers/validates";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      _id
      email
    }
  }
`;

function Login() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({
    content: "",
    color: "default",
  });
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, control } = useForm(); // initialise the hook
  const [logIn, logInRes] = useMutation(LOGIN);

  useEffect(() => {
    const { called, data, loading, error } = logInRes;
    if (called && !loading && error) {
      setVisible(true);
      setMessage({
        content: "Login Failed",
        color: "danger",
      });
    } else if (called && !loading && !error) {
      setVisible(true);
      setMessage({
        content: "Loin Success",
        color: "success",
      });
    }
    return () => {};
  }, [logInRes]);

  const onSubmit = (data) => {
    const errors = loginFormValidate(data);
    setErrors(errors);

    if (_.isEmpty(errors)) {
      logIn({ variables: { email: data.email, password: data.password } });
    }
  };

  const onDismiss = () => setVisible(false);

  console.log("render login");

  return (
    <div className="input-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12}>
            <Alert
              color={message.color}
              isOpen={visible}
              toggle={onDismiss}
              fade={false}
            >
              {message.content}
            </Alert>
          </Col>
          <Col sm={12}>
            <FormGroup row>
              <Label for="email">Email:</Label>
              <Controller
                as={Input}
                name="email"
                id="email"
                control={control}
                defaultValue=""
              />
              {errors.email && (
                <span className="error">Email is required.</span>
              )}
            </FormGroup>
          </Col>
          <Col sm={12}>
            <FormGroup row>
              <Label for="password">Password:</Label>
              <Controller
                as={Input}
                id="password"
                name="password"
                type="password"
                control={control}
                defaultValue=""
              />
              {errors.password && (
                <span className="error">Password is required.</span>
              )}
            </FormGroup>
          </Col>
          <Col sm={12} className="form-bottom" row="true">
            <Button color="primary" type="submit" className="btn-auth">
              Login
            </Button>
            <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
