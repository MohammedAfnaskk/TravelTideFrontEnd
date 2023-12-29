
import { Routes, Route } from "react-router-dom";
import UserHomePage from "../pages/UserUI/home/home";
import LocationPlan from "../pages/UserUI/TripPlanning/location";
import TripPage from "../pages/UserUI/TripPage/userTripPage";
import TripPlanning from "../pages/UserUI/TripPlanning/mainPage";
import { TripPackagePage } from "../pages/UserUI/Join a Trip/TripPackages/mainPage";
import { TripGuidingPage } from "../pages/UserUI/Travel Guide/mainPage";

import PackageDetails from "../pages/UserUI/Join a Trip/PackageDetails/tripPage";
import GuidingDetails from "../pages/UserUI/Travel Guide/TripGuidingPage/tripPage";
import UserProtected from "./ProtuctedRoutes/UserProtected";
import Profile from "../components/Profile/profile";
import InviteeTripPage from "../pages/UserUI/InvitaionTripPage/invitationTripPage";
import EditPlanningPage from "../pages/UserUI/TripEditing/mainPage";
function UserRoutes() {
  return (
    <Routes>
      <Route exact element={<UserProtected />} />
      <Route path="/" element={<UserHomePage />} />
      <Route path="/location_plan" element={<LocationPlan />} />
      <Route path="/trip-planning" element={<TripPlanning />} />
      <Route path="/trip-page" element={<TripPage />} />
      <Route path="/trip-join" element={<TripPackagePage />} />
      <Route path="/trip-guiding" element={<TripGuidingPage />} />
      <Route path="/trip-package-details/:id/" element={<PackageDetails />} />
      <Route path="/trip-guiding-details/:id/" element={<GuidingDetails />} />
      <Route path="/user-profile" element={<Profile />} />
      <Route
        path="/trip-page-invitee/:emailId/:tripDataId"
        element={<InviteeTripPage />}
      />
      <Route path="/edit-trip" element={<EditPlanningPage/>} />
  
    </Routes>
  );
}

export default UserRoutes; 