import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserUI/home/home';
import LocationPlan from '../pages/UserUI/TripPlanning/location'
import TripPage from '../pages/UserUI/TripPage/tripPage';
import TripPlanning from '../pages/UserUI/TripPlanning/mainPage'
import { TripPackagePage } from '../pages/UserUI/Join a Trip/TripPackages/mainPage';
import PackageDetails from '../pages/UserUI/Join a Trip/PackageDetails/tripPage'
function UserRoutes() { 

  return (
    <Routes>
        <Route path='/' element={<UserHomePage />}/>
        <Route path='/location_plan' element={<LocationPlan/>}/>
        <Route path='/trip-planning' element={<TripPlanning/>}/>
        <Route path='/trip-page' element={<TripPage/>}/>
        <Route path='/trip-join' element={<TripPackagePage/>}/>
        <Route path='/trip-package-details/:id' element={<PackageDetails/>}/>

    </Routes>
  );
}

export default UserRoutes;
    