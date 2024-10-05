import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import axios from 'axios';
import '@blueprintjs/core/lib/css/blueprint.css';
import './profile.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', oldPassword: '', newPassword: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const user = response.data.user;
          setUserDetails(user);
          setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            oldPassword: '', // Clear old password field
            newPassword: '', // Clear new password field
          });
        }
      } catch (error) {
        toaster.show({
          intent: Intent.DANGER,
          message: 'You Are Guest',
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
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    // Validate inputs
    if (!oldPassword || !newPassword || !confirmPassword) {
      toaster.show({
        intent: Intent.DANGER,
        message: 'All password fields are required.',
        timeout: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toaster.show({
        intent: Intent.DANGER,
        message: 'New passwords do not match.',
        timeout: 3000,
      });
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put('http://localhost:5000/api/profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUserDetails((prev) => ({ ...prev, ...formData }));
        localStorage.setItem('email', formData.email);
        
        setIsEditing(false);
        navigate('/profile');
        toaster.show({
          intent: Intent.SUCCESS,
          message: 'Profile updated successfully',
          timeout: 3000,
        });
      }
    } catch (error) {
      toaster.show({
        intent: Intent.DANGER,
        message: 'Old Password does not match',
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
              <label style={{ color: "white" }}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ color: "white" }}>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ color: "white" }}>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ color: "white" }}>
                Old Password:
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ color: "white" }}>
                New Password:
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              <label style={{ color: "white" }}>
                Confirm New Password:
                <input
                  type="password"
                  name="confirmPassword" // Ensure this matches the formData property
                  value={formData.confirmPassword} // Use formData.confirmPassword
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Update Profile</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );

};

export default Profile;
