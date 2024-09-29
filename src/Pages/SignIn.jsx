import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './CSS/Signup.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Use useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Show success message
        toaster.show({
          message: 'Sign in successful',
          intent: Intent.SUCCESS,
          timeout: 3000
        });

        // Use navigate to redirect to the home page
        navigate('/Home');
      } else {
        // Show error message
        toaster.show({
          intent: Intent.DANGER,
          message: data.message,
          timeout: 3000
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: 'An error occurred during sign-in.',
        timeout: 3000
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" id="background">
      <form className="border p-4 rounded shadow-lg text-light" onSubmit={handleSubmit}>
        <h1 className="text-center text-light">Sign In</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <Link to="/signup">Create an Account</Link>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
