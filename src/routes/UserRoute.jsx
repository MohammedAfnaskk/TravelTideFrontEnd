import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserUI/home/home';
import LocationPlan from '../pages/UserUI/location';
import HomePage from '../pages/UserUI/tripPlaning';
import TripPage from '../pages/UserUI/TripPage/tripPage'
function UserRoutes() { 

  return (
    <Routes>
        <Route path='/' element={<UserHomePage />}/>
        <Route path='/location_plan' element={<LocationPlan/>}/>
        <Route path='/trip-planning' element={<HomePage/>}/>
        <Route path='/trip-page' element={<TripPage/>}/>

    </Routes>
  );
}

export default UserRoutes;
    