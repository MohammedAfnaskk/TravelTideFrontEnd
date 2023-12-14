import { Routes, Route } from 'react-router-dom';
import GuideHomePage from '../pages/GuideUI/home/home';
import LocationPlan from '../pages/GuideUI/TripPlanningGuide/location'
import TripPage from '../pages/GuideUI/TripPageGuide/tripPage';
import TripPlanning from '../pages/GuideUI/TripPlanningGuide/mainPage'
import Profile from '../components/Profile/profile'
import GuideProtected from './ProtuctedRoutes/GuideProtected';
import EditPlanningPage from "../pages/UserUI/TripEditing/mainPage";
import { TripGuidingPage } from "../pages/UserUI/Travel Guide/mainPage";
import UserChat from '../components/ChatBox/chatList';

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
        <Route path="/chat-list" element={<UserChat/>}/>

     </Routes>
 
  );
}

export default GuideRoutes;
