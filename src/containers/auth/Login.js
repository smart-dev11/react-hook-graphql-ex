import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form, FormGroup, Label, Row, Col } from "reactstrap";
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
  const { register, handleSubmit, control } = useForm(); // initialise the hook
  const [logIn, logInRes] = useMutation(LOGIN);

  useEffect(() => {
    const { data } = logInRes;

    console.log(12312, data);

    return () => {};
  }, [logInRes.data]);

  const onSubmit = (data) => {
    const errors = loginFormValidate(data);
    setErrors(errors);

    if (_.isEmpty(errors)) {
      logIn({ variables: { email: data.email, password: data.password } });
    }
  };

  return (
    <div className="input-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
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
              {errors.email && "Email is required."}
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
              {errors.password && "password is required."}
            </FormGroup>
          </Col>
          <Col sm={12}>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Login;
