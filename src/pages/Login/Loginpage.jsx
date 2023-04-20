import React, { useEffect } from 'react';
import classes from './Login.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import crmLogo from '../../assets/login/logo.png';
import Col from 'react-bootstrap/Col';
import LoginForm from './LoginForm';
import LoginSuccess from '../../component/Login/SuccessMessage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Loginpage = () => {
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);

  const isloggedIn = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (isloggedIn === 'true') {
      console.log('Inside isloggedIn');
      navigate('/home');
    }
  }, [navigate, isloggedIn]);

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
          <LoginForm isAuthenticated={isloggedIn} error={error} />
        )}
        {/* <LoginForm /> */}
        {/* <LoginSuccess /> */}
      </Row>
    </Container>
  );
};

export default Loginpage;
