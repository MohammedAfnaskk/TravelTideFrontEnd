import { Routes, Route } from 'react-router-dom';
import GuideHomePage from '../pages/GuideUI/home/home';
import LocationPlan from '../pages/GuideUI/TripPlanningGuide/location'
import TripPage from '../pages/GuideUI/TripPageGuide/tripPage';
import TripPlanning from '../pages/GuideUI/TripPlanningGuide/mainPage'
import Profile from '../components/Profile/profile'
import GuideProtected from './ProtuctedRoutes/GuideProtected';
  
function GuideRoutes() {
  return (
    <Routes>
      <Route exact element={<GuideProtected/>}/>
        <Route path='/' element={<GuideHomePage />} />
        <Route path='/location_plan' element={<LocationPlan/>}/>  
        <Route path='/trip-planning-guide' element={<TripPlanning/>}/>
        <Route path='/trip-page-guide' element={<TripPage/>}/>
        <Route path='/guide-profile' element={<Profile/>}/>
     </Routes>
  );
}

export default GuideRoutes;
