import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserUI/home/home';
import LocationPlan from '../pages/UserUI/location';
import HomePage from '../pages/UserUI/tripPlaning';
function UserRoutes() { 

  return (
    <Routes>
        <Route path='/' element={<UserHomePage />}/>
        <Route path='/location_plan' element={<LocationPlan/>}/>
        <Route path='/trip_planning' element={<HomePage/>}/>

    </Routes>
  );
}

export default UserRoutes;
    