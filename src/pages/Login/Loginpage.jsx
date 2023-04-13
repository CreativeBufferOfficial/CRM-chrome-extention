import React from 'react';
import classes from './Login.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import crmLogo from '../../assets/login/logo.png';
import Col from 'react-bootstrap/Col';
import LoginForm from './LoginForm';
import LoginSuccess from '../../component/Login/SuccessMessage';
import { useSelector } from 'react-redux';

const Loginpage = () => {
  const { error, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Container fluid className={classes.App}>
      <Row>
        <Col className={classes.imgbox}>
          <img className={classes.crm_logo} src={crmLogo} alt="logo" />
        </Col>
      </Row>
      <Row>
        {isAuthenticated ? (
          <LoginSuccess isAuthenticated={isAuthenticated} error={error} />
        ) : (
          <LoginForm isAuthenticated={isAuthenticated} error={error} />
        )}
        {/* <LoginForm /> */}
        {/* <LoginSuccess /> */}
      </Row>
    </Container>
  );
};

export default Loginpage;
