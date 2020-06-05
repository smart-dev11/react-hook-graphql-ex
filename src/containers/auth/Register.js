import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
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
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, control } = useForm(); // initialise the hook
  const [signUp, signUpRes] = useMutation(REGISTER);

  useEffect(() => {
    const { called, data, loading, error } = signUpRes;
    if (called && !loading && error) {
      setVisible(true);
      setMessage("Login Failed");
    } else if (called && !loading && !error) {
      setVisible(true);
      setMessage("Login Success");
    }
    return () => {};
  }, [signUpRes]);

  const onSubmit = (data) => {
    const errors = registerFormValidate(data);
    setErrors(errors);
    if (_.isEmpty(errors)) {
      signUp({ variables: { email: data.email, password: data.password } });
    }
  };

  const onDismiss = () => setVisible(false);

  return (
    <div className="input-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12}>
            <Alert
              color="primary"
              isOpen={visible}
              toggle={onDismiss}
              fade={false}
            >
              {message}
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
              {errors.confirmPassword && (
                <span className="error">Confirm Password is required.</span>
              )}
            </FormGroup>
          </Col>
          <Col sm={12} className="form-bottom">
            <Button color="primary" type="submit" className="btn-auth">
              Register
            </Button>
            <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Register;
