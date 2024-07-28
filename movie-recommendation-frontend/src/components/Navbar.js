// src/components/Navbar.js
import React from 'react';
// import { Link } from 'react-router-dom';
import logo from '../camera.png'; // Make sure you have a logo.svg in your src directory or replace it with the path to your logo
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href='http://localhost:3000/'><img src={logo} alt="Logo" /></a>
      </div>
      <div className="navbar-tagline">
        <h1>Find Your Next Movie</h1>
      </div>
      <div className="nav-links">
        <a href='/' className='navver'>Home</a>
        <a href='/'>Contacts</a>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/about">About Us</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
