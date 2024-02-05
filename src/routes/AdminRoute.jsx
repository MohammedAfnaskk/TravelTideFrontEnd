// AdminRoutes.js

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import AdminLogin from '../components/Authentication/AdminAuth/login';
import Dashboard from '../pages/AdminUI/dashboard';
import Tables from '../pages/AdminUI/Table/table';
import AdminTripPage from '../pages/AdminUI/TripPageAdmin/tripPage';
import AdminGuidingDetails from '../pages/AdminUI/Dashboard/tripPageAdmin';
import EditPlanningPage from '../pages/UserUI/TripEditing/mainPage';

// Function to check if the user is authenticated as an admin
const isAdminAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.role === 'admin';
  }

  return false;
};

const AdminRoutes = () => {
  const navigate = useNavigate();

  // Check authentication and navigate to admin login if needed
  if (!isAdminAuthenticated()) {
    navigate('/admin/login');
  }

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashbord" element={<Dashboard />} />
      <Route path="/gudie-list" element={<Tables />} />
      <Route path="/trip-page-admin" element={<AdminTripPage />} />
      <Route path="/guiding-page-admin/:id" element={<AdminGuidingDetails />} />
      <Route path="/edit-trip" element={<EditPlanningPage />} />
      {/* Add more admin routes as needed */}
    </Routes>
  );
};

export default AdminRoutes;
