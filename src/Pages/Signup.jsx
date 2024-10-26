import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './CSS/Signup.css';
import signPageImage from '../Components/Assets/signPageImage.jpg';

const toaster = Toaster.create({
  position: Position.TOP,
});

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // localStorage.setItem('name', formData.name);
  
      const data = await response.json();
      if (response.ok) {
        toaster.show({
          intent: Intent.SUCCESS,
          message: data.message,
          timeout: 3000
        });
        
        navigate('/signin'); // Redirect after successful sign-up
      } else {
        toaster.show({
          intent: Intent.DANGER,
          message: data.message,
          timeout: 3000
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative d-flex align-items-center justify-content-center">
      <img src={signPageImage} alt="Sign Page" className="absolute top-0 left-0 w-full h-full object-cover" />
      <form onSubmit={handleSubmit} className="relative p-4 rounded-2xl shadow-lg text-light right-52 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 my-32">
        <h1 style={{color:"white"}}>Sign Up</h1>
        <div className="mb-2">
          <label htmlFor="name" className="form-label text-white">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label text-white">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label text-white">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="form-label text-white">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-2 form-check">
          <Link to="/signin" className="link text-black" style={{ textDecoration: 'none' }}>I already have an account</Link>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn-primary bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-3xl px-4 border">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
