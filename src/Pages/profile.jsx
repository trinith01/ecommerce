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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toaster.show({
        intent: Intent.WARNING,
        message: 'Please sign in first.',
        timeout: 3000,
      });
      navigate('/signin');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.status === 200) setUserDetails(response.data.user);
      } catch {
        toaster.show({
          intent: Intent.DANGER,
          message: 'Failed to load profile. Please try again.',
          timeout: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>; // Center loading text
  }

  return (
    <div className="bg-[#00143c] min-h-screen flex items-center justify-center p-6"> {/* Full-screen background */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"> {/* Card styling */}
        {userDetails ? (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-center">{userDetails.name}'s Profile</h1>
            <p className="text-gray-800"><strong>Email:</strong> {userDetails.email}</p>
            <p className="text-gray-800"><strong>Phone:</strong> {userDetails.phone}</p>
          </>
        ) : (
          <p className="text-center text-gray-600">No user details available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
