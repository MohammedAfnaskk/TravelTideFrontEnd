import React, { useEffect } from 'react';
import Navbar, { ComplexNavbar } from '../components/Navbar/navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  // Define a function to determine if the current route is an admin route
  const isAdminRoute = (pathname) => {
    return pathname.startsWith('/admin/');
  };

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  return (
    <div>
      {/* Conditionally render ComplexNavbar based on whether it's an admin route */}
      {!isAdminRoute(location.pathname) && <ComplexNavbar />}
      {children}
    </div>
  );
};

export default Layout;
