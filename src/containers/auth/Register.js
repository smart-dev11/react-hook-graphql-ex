import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form, FormGroup, Label, Row, Col } from "reactstrap";
import * as _ from "lodash";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { registerFormValidate } from "../../helpers/validates";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      _id
      email
    }
  }
`;

function Register() {
  const [errors, setErrors] = useState({});
  const { register, handleSubmit, control } = useForm(); // initialise the hook
  const [signUp, signUpRes] = useMutation(REGISTER);

  useEffect(() => {
    const { data } = signUpRes;

    console.log(12312, data);

    return () => {};
  }, [signUpRes.data]);

  const onSubmit = (data) => {
    const errors = registerFormValidate(data);
    setErrors(errors);
    if (_.isEmpty(errors)) {
      signUp({ variables: { email: data.email, password: data.password } });
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
              {errors.confirmPassword && "Password is required."}
            </FormGroup>
          </Col>
          <Col sm={12}>
            <FormGroup row>
              <Label for="confirmPassword">Confirm Password:</Label>
              <Controller
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                control={control}
                defaultValue=""
              />
              {errors.confirmPassword && "Confirm Password is required."}
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

export default Register;
