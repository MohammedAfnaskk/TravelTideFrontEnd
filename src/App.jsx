import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/UserUI/home/home'; 
import Login from './components/Authentication/UserAuth/login';
 
import 'tailwindcss/tailwind.css';
import MailConfirm from './components/Authentication/UserAuth/registerResendmail'
import UserRole from './components/Authentication/setRole';
import UserRoutes from './routes/UserRoute';
import GuideRoutes from './routes/GuideRoute';
import AdminRoutes from './routes/AdminRoute';
import PrivateRoutes from './routes/ProtuctedRoutes/PrivateRoute';
   

function App() {
 

  return (
    <div>
       {/* // <Router>
      // <Routes>
      // <Route element={<PrivateRoutes/>}>
      // <Route path="/" element={<Home />} />
      // <Route path="/register-resendmail" element={<MailConfirm />} />
      // <Route path="/user_role" exact element={<UserRole />} />
      // </Route>

      //   <Route path="/user/*" element={<UserRoutes />} />
      //   <Route path="/guide/*" element={<GuideRoutes />} />
      //   <Route path="/admin/*" element={<AdminRoutes />} />
 
      // </Routes>     
      // </Router> */}

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
   
     </div>
  );
}

export default App;
