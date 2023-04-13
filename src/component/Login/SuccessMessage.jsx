import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate, useLocation } from 'react-router';
import classes from './SuccessMessage.module.css';
import successIcon from '../../assets/successful/successful_icon_check.png';

const SuccessMessage = ({ isAuthenticated, error }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/home';

  useEffect(() => {
    let time;
    if (isAuthenticated) {
      time = setTimeout(() => {
        Navigate(redirect);
      }, 2000);
    }
    return () => {
      clearInterval(time);
    };
  }, [error, isAuthenticated, Navigate, redirect]);

  return (
    <div>
      <Card className={classes.success}>
        <Card.Body className={classes.success_body}>
          <div className={classes.success_icon}>
            <img src={successIcon} alt="success_icon" />
          </div>
          <div className={classes.success_message}>
            <h5 className={classes.message}>Login Successful</h5>
            <p>You have successfully signed into your account.</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SuccessMessage;
