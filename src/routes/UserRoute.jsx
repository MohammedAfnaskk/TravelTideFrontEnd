import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserUI/home/home';
import LocationPlan from '../pages/UserUI/TripPlanning/location'
import TripPage from '../pages/UserUI/TripPage/tripPage';
import TripPlanning from '../pages/UserUI/TripPlanning/mainPage'
function UserRoutes() { 

  return (
    <Routes>
        <Route path='/' element={<UserHomePage />}/>
        <Route path='/location_plan' element={<LocationPlan/>}/>
        <Route path='/trip-planning' element={<TripPlanning/>}/>
        <Route path='/trip-page' element={<TripPage/>}/>
    </Routes>
  );
}

export default UserRoutes;
    