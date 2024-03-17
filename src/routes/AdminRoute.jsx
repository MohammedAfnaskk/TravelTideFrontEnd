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
import AdminProtected from './ProtuctedRoutes/AdminProtected';

  

function AdminRoutes () {
 

  return (
    <Routes>
       <Route path="/login" element={<AdminLogin />} />
      <Route element={<AdminProtected />} >
      <Route path="/dashbord" element={<Dashboard />} />
      <Route path="/gudie-list" element={<Tables />} />
      <Route path="/trip-page-admin" element={<AdminTripPage />} />
      <Route path="/guiding-page-admin/:id" element={<AdminGuidingDetails />} />
      <Route path="/edit-trip" element={<EditPlanningPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
