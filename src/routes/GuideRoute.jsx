import { Routes, Route } from 'react-router-dom';
import GuideHomePage from '../pages/GuideUI/home/home';
<<<<<<< HEAD
import LocationPlan from '../pages/GuideUI/TripPlanningGuide/location'
import TripPage from '../pages/GuideUI/TripPageGuide/tripPage';
import TripPlanning from '../pages/GuideUI/TripPlanningGuide/mainPage'
import Profile from '../components/Profile/profile'
import GuideProtected from './ProtuctedRoutes/GuideProtected';
import EditPlanningPage from "../pages/UserUI/TripEditing/mainPage";
import { TripGuidingPage } from "../pages/UserUI/Travel Guide/mainPage";

function GuideRoutes() {
  return (
    <Routes>
      <Route exact element={<GuideProtected/>}/>
        <Route path='/' element={<GuideHomePage />} />
        <Route path='/location_plan' element={<LocationPlan/>}/>  
        <Route path='/trip-planning-guide' element={<TripPlanning/>}/>
        <Route path='/trip-page-guide' element={<TripPage/>}/>
        <Route path='/guide-profile' element={<Profile/>}/>
        <Route path="/edit-trip" element={<EditPlanningPage/>} />
        <Route path="/trip-guiding" element={<TripGuidingPage />} />


     </Routes>
=======
  
function GuideRoutes() {
  return (
    <Routes>
        <Route path='/' element={<GuideHomePage />} />
      </Routes>
>>>>>>> origin/main
  );
}

export default GuideRoutes;
