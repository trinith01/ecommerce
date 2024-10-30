import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element }) => {
  const userRole = localStorage.getItem('role');

  if (userRole === 'admin') {
    return element; 
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;