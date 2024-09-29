import React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; // Import the CSS file for additional styling

const NavBar = () => {
  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <div className="logo">C-Ex</div>
        <Navbar.Divider />
        <Link to="/signin" className="nav-link">Sign In</Link> {/* Updated to match route */}
        <Link to="/signup" className="nav-link">Sign Up</Link> {/* Updated to match route */}
        <Link to="/cart" className="nav-link">Cart</Link> {/* Updated to match route */}
        <Link to="/categories" className="nav-link">Categories</Link> {/* Updated to match route */}
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
