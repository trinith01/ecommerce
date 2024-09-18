import React from "react";
import { Link } from "react-router-dom";
import './CSS/Signup.css';


function SignIn() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 " id="background">
      <form className="border p-4 rounded shadow-lg text-light">
        <h1 className="text-center text-light">Sign In</h1>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <Link to="/signup">Create an Account</Link>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">
            Sign In
          </button>

        </div>
        
      </form>
    </div>
  );
}

export default SignIn;