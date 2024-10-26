import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './CSS/Signup.css';
import signPageImage from '../Components/Assets/signPageImage.jpg';

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
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        // Show success message
        toaster.show({
          message: 'Sign in successful',
          intent: Intent.SUCCESS,
          timeout: 3000
        });
  
        // Save the token in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        // localStorage.setItem('password', password);
  
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
    <div className="relative d-flex align-items-center justify-content-center vh-100">
      <img src={signPageImage} alt="Sign Page" className="absolute top-0 left-0 w-full h-full" />
      <form className="relative p-4 rounded-2xl shadow-lg text-light right-52 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" onSubmit={handleSubmit}>
        <h1 className="text-center text-light">Sign In</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <Link to="/signup" style={{ textDecoration: 'none' }} className="text-black">Create an Account</Link>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn-primary bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-3xl px-4 border">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
