import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../components/Authentication/AdminAuth/login';
import Dashboard from '../pages/AdminUI/dashboard';
<<<<<<< HEAD
import PrivateRoutes from './ProtuctedRoutes/PrivateRoute';
import Tables from '../pages/AdminUI/Table/table';
import AdminTripPage from '../pages/AdminUI/TripPageAdmin/tripPage'
import AdminGuidingDetails from '../pages/AdminUI/Dashboard/tripPageAdmin';
import EditPlanningPage from "../pages/UserUI/TripEditing/mainPage";

=======
>>>>>>> origin/main
function AdminRoutes() {

  return (
    <Routes>
<<<<<<< HEAD
        <Route element={<PrivateRoutes/>}>
      </Route>

        {/* <Route element={<AdminProtected/>}> */}
           <Route path='/login' element={<AdminLogin />} />
           <Route path='/' element={<Dashboard/>}/>
           <Route path='/gudie-list' element={<Tables/>}/>
           <Route path='/trip-page-admin' element={<AdminTripPage/>}/>
           <Route path='/guiding-page-admin/:id'element={<AdminGuidingDetails/>}/>
           <Route path="/edit-trip" element={<EditPlanningPage/>} />

        {/* </Route> */}
    </Routes>
=======
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
>>>>>>> origin/main
  );
}

export default AdminRoutes;
