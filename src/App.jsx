import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/UserUI/home/home';
<<<<<<< HEAD
=======
import Login from './components/Authentication/UserAuth/login';
>>>>>>> origin/main
import 'tailwindcss/tailwind.css';
import MailConfirm from './components/Authentication/UserAuth/registerResendmail'
import UserRole from './components/Authentication/setRole';
import UserRoutes from './routes/UserRoute';
import GuideRoutes from './routes/GuideRoute';
import AdminRoutes from './routes/AdminRoute';
<<<<<<< HEAD
import PrivateRoutes from './routes/ProtuctedRoutes/PrivateRoute';
  
=======
 
>>>>>>> origin/main

function App() {
 

  return (
    <div>
<<<<<<< HEAD
      <Router>
      <Routes>
      <Route element={<PrivateRoutes/>}>
      <Route path="/" element={<Home />} />
      <Route path="/register-resendmail" element={<MailConfirm />} />
      <Route path="/user_role" exact element={<UserRole />} />
      </Route>

        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/guide/*" element={<GuideRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
 
      </Routes>     
      </Router>
=======
      <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-resendmail" element={<MailConfirm />} />
              <Route path="/user_role" exact element={<UserRole />} />
        </Routes>

        <Routes>
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/guide/*" element={<GuideRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>   
   
>>>>>>> origin/main
    </div>
  );
}

export default App;
