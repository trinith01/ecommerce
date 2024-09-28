import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address:''
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
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // navigate('signin'); // Redirect after successful sign-up
        window.location.href='signin'
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" id="background">
      <form className="border p-4 rounded shadow-lg text-light" onSubmit={handleSubmit}>
        <h1 className="text-center text-light">Sign Up</h1>
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 form-check">
          <Link to="/signin">I already have an account</Link>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
