import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../actions/UserAction';
import { useDispatch } from 'react-redux';
import userIcon from '../../assets/login/email.png';
import passwordIcon from '../../assets/login/password.png';
import viewIcon from '../../assets/login/view.png';
import closeEye from '../../assets/login/close-eye.png';
import classes from './LoginForm.module.css';
import Card from 'react-bootstrap/Card';

const LoginForm = ({ isAuthenticated, error }) => {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);
  const [failMessage, setFailMessage] = useState(false);
  useEffect(() => {
    if (error === 'UnAuthorized') {
      setFailMessage(true);
    }
  }, [dispatch, error]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const Eye = () => {
    if (loginPassword.length > 0) {
      seteye((prev) => !prev);
      settype((prev) => !prev);
    }
  };

  return (
    <Form onSubmit={loginSubmit} className={classes.main}>
      <Form.Group
        className={`mb-3${classes.form_group} `}
        controlId="formBasicEmail"
      >
        <i className={classes.user_icon}>
          <img src={userIcon} alt="email" />
        </i>
        <Form.Control
          className={classes.input_field}
          type="email"
          placeholder="Email"
          name="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="formBasicPassword">
        <i className={classes.user_icon}>
          <img src={passwordIcon} alt="password" />
        </i>
        <Form.Control
          className={classes.input_field}
          type={type ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <i onClick={Eye}>
          <img
            className={eye ? classes.view : classes.close}
            src={eye ? viewIcon : closeEye}
            alt="view"
          />
        </i>
      </Form.Group>
      <Form.Group controlId="forgetPassword">
        <Form.Label className={classes.forget_pass}>
          Forget Password ?
        </Form.Label>
        {failMessage ? (
          <Card>
            <Card.Body className={classes.fail_message}>
              *Login failed - The Email and password entered is incorrect.
              Please try again.
            </Card.Body>
          </Card>
        ) : (
          ''
        )}
      </Form.Group>
      <Button className={classes.login_btn} type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
