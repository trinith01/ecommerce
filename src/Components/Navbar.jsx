import React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css'; // Import the CSS file for additional styling

const NavBar = () => {
  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.CENTER}>
        {/* Logo with home link */}
        <FontAwesomeIcon icon={faHome} />
        <Link to="/home" className="logo"> &nbsp;C-Ex</Link>
        <Navbar.Divider />

        {/* Navigation links with icons */}
        <Link to="/signin" className="nav-link" title="Sign In">
          <FontAwesomeIcon icon={faUser} />Sign In
        </Link>
        <Navbar.Divider />
        <Link to="/signup" className="nav-link" title="Sign Up">
          <FontAwesomeIcon icon={faUser} />Sign Up
        </Link>
        <Navbar.Divider />
        <Link to="/cart" className="nav-link" title="Cart">
          <FontAwesomeIcon icon={faShoppingCart} />Cart
        </Link>
        <Navbar.Divider />
      
        <div className="nav-container">
          <Link to="/signin" className="nav-link" title="Sign Out">
            <FontAwesomeIcon icon={faSignOutAlt} />Sign out
          </Link>
        </div>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
