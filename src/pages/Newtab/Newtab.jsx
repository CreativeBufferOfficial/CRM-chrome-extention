import React from 'react';
import classes from './Newtab.module.css';
// import './Newtab.scss';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Loginpage';
import Home from '../Home/Homepage';
import Dashboard from '../Dashboard/Dashboard';
// import { useSelector } from 'react-redux';

const Newtab = () => {
  // const {isAuthenticated} = useSelector(state=>state.user)

  return (
    <div className={classes.App}>
      {/* <ul>
        <li>login</li>
        <li>Home</li>
      </ul> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Newtab;
