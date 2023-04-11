import React from 'react';
import classes from './Home.module.css';
import logo from '../../assets/img/logo.svg';

const Homepage = () => {
  return (
    <div>
      <div className={classes.main}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World</p>
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> new tab extension.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </div>
    </div>
  );
};

export default Homepage;
