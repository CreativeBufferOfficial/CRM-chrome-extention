import React from 'react';
import './Newtab.css';
import './Newtab.scss';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Loginpage';
import Home from '../Home/Homepage';

const Newtab = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Newtab;
