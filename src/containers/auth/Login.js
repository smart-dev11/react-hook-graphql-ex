import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input, Form, FormGroup, Label, Row, Col } from "reactstrap";

function Login() {
  const { register, handleSubmit, errors, control } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(123, data);
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
