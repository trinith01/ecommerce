import React from "react";
import './Navbar.css'
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-transparent">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          C-Ex
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="home" className="nav-link active" aria-current="page">
              Home
            </Link>
            <Link to="/electronics" className="nav-link">
              Electronics
            </Link>
            <Link  to="/toys" className="nav-link">
              Toys
            </Link>
            <Link to="/cart" className="nav-link">
             Cart
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link to="/signin" className="btn btn-outline-light me-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-light">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;