import React, { useState, useEffect } from 'react';
import classes from './Login.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { login, clearErrors } from '../../actions/UserAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import crmLogo from '../../assets/img/icon-128.png';

const Loginpage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/home';

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated, Navigate, redirect]);

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log('logged');
    dispatch(login(loginEmail, loginPassword));
  };

  return (
    <Container className={classes.App}>
      <Row>
        <Col className={classes.imgbox}>
          <img className={classes.crm_logo} src={crmLogo} alt="logo" />
        </Col>
      </Row>
      <Row className={classes.main}>
        <Form onSubmit={loginSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
            <Form.Control
              className={classes.input_field}
              type="password"
              placeholder="Password"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
