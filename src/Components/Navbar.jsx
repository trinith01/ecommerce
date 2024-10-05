import React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email'); // Retrieve the name from localStorage

  const handleSignOut = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    // localStorage.removeItem('name'); // Clear name from localStorage
    navigate('/signin');
  };

  return (
    <Navbar className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        
        <Link to="/home" className="logo"> <FontAwesomeIcon icon={faHome} />&nbsp;C-Ex</Link>
        <Navbar.Divider />
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
      </Navbar.Group>

      <Navbar.Group align={Alignment.RIGHT}>
        {/* Display user greeting with name */}
        <Link to="/profile" className="nav-link" title="Profile">
        {email && (
          <span className="nav-link user-greeting">
            <FontAwesomeIcon icon={faUser} /> Hello, {email}!
          </span>
          
        )}
        </Link>
        <button className="nav-link signout-button" title="Sign Out" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
        </button>
      </Navbar.Group>
    </Navbar>
  );
};

export default NavBar;
