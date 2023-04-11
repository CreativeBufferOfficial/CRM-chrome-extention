import React, { useState } from 'react';
import classes from './Login.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Loginpage = () => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState({
    email: '',
    password: '',
  });

  const handlerChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let errors = validation;

    // email validation
    const emailCond =
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/";
    if (!inputValues.email.trim()) {
      errors.email = 'Email is required';
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = 'Please ingress a valid email address';
    } else {
      errors.email = '';
    }

    //password validation
    const password = inputValues.password;
    if (!password) {
      errors.password = 'password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be longer than 6 characters';
    } else {
      errors.password = '';
    }
    console.log(inputValues);
    return setValidation(errors);
    //TODO: // Get Form Data

    // TODO: // Login Api Call

    // TODO: // Set Input  blank
  };

  return (
    <Container className={classes.App}>
      <Row></Row>
      <Row className={classes.main}>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className={classes.input_field}
              type="email"
              placeholder="Email"
              name="email"
              onChange={handlerChange}
            />

            {validation.email && (
              <Form.Text className={`text-muted ${classes.muted_text} `}>
                {validation.email}
              </Form.Text>
            )}
            {/* {validation.email && console.log(validation)} */}
            {/* <Form.Text className="text-muted">
              Please Enter your email.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Control
              className={classes.input_field}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handlerChange}
            />
          </Form.Group>
          <Form.Group
            className={classes.forget_pass}
            controlId="forgetPassword"
          >
            <Form.Label>Forget Password ?</Form.Label>
          </Form.Group>
          <Button className={classes.login_btn} variant="success" type="submit">
            Login
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Loginpage;
