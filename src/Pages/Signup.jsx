import React from "react";
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100" id="background">
      <form className="border p-4 rounded shadow-lg text-light" style={{ backgroundColor: 'transparent'}}>
        <h1 className="text-center text-light">Sign Up</h1>

        <div className="mb-2">
          <label htmlFor="name" className="form-label ">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="number" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            
          />
        </div>

        <div className="mb-2 form-check">
          <Link to="/signin">I already have an account</Link>
        </div>
        
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
