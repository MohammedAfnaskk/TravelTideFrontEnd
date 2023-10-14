import { Routes, Route } from 'react-router-dom';
import GuideHomePage from '../pages/GuideUI/home/home';
import LocationPlan from '../pages/GuideUI/TripPlanningGuide/location'
import TripPage from '../pages/GuideUI/TripPageGuide/tripPage';
import TripPlanning from '../pages/GuideUI/TripPlanningGuide/mainPage'
  
function GuideRoutes() {
  return (
    <Routes>
        <Route path='/' element={<GuideHomePage />} />
        <Route path='/location_plan' element={<LocationPlan/>}/>
        <Route path='/trip-planning-guide' element={<TripPlanning/>}/>
        <Route path='/trip-page-guide' element={<TripPage/>}/>
      </Routes>
  );
}

export default GuideRoutes;
