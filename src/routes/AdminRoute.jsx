import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/Authentication/AdminAuth/login';
import Dashboard from '../pages/AdminUI/dashboard';
import PrivateRoutes from './ProtuctedRoutes/PrivateRoute';
import Tables from '../pages/AdminUI/Table/table';
function AdminRoutes() {

  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
      </Route>

        {/* <Route element={<AdminProtected/>}> */}
                <Route path='/login' element={<AdminLogin />} />
           {/* <Route path='/' element={<Dashboard/>}/> */}
           <Route path='/gudie-list' element={<Tables/>}/>
        {/* </Route> */}
    </Routes>
  );
}

export default AdminRoutes;
