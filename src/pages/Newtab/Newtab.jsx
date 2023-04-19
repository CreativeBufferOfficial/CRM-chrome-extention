import React from 'react';
import classes from './Newtab.module.css';
// import './Newtab.scss';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Loginpage';
import Home from '../Home/Homepage';
import Dashboard from '../Dashboard/Dashboard';

const Newtab = () => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Newtab;
