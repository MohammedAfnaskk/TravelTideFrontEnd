import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/Authentication/AdminAuth/login';
import Dashboard from '../pages/AdminUI/dashboard';
function AdminRoutes() {

  return (
    <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
  );
}

export default AdminRoutes;
