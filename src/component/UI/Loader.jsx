import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classes from './Loader.module.css';
const Loader = () => {
  return (
    <div className={classes.loader}>
      <Spinner animation="border" variant="success" />
    </div>
  );
};

export default Loader;
