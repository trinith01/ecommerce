// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import './profile.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' }); // Form data
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // If there's no token, redirect to the sign-in page
      navigate('/signin');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserDetails(data.user);
          setFormData({
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone,
            password: '', // Reset password field
          });
        } else {
          toaster.show({
            intent: Intent.DANGER,
            message: data.message,
            timeout: 3000,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toaster.show({
          intent: Intent.DANGER,
          message: 'An error occurred while fetching user details.',
          timeout: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent form submission

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUserDetails((prev) => ({ ...prev, ...formData }));
        setIsEditing(false); // Exit edit mode
        toaster.show({
          intent: Intent.SUCCESS,
          message: 'Profile updated successfully',
          timeout: 3000,
        });
      } else {
        toaster.show({
          intent: Intent.DANGER,
          message: data.message,
          timeout: 3000,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toaster.show({
        intent: Intent.DANGER,
        message: 'An error occurred while updating the profile.',
        timeout: 3000,
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      {userDetails ? (
        <div>
          <h1>{userDetails.name}'s Profile</h1>
          {!isEditing ? (
            <div>
              <p>Email: {userDetails.email}</p>
              <p>Phone: {userDetails.phone}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
};

export default Profile;
