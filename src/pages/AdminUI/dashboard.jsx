import React, { useState } from "react";
import AdminSideNav from "./SideNavbar/sideNav";
import AdminNavbar from "./Navbar/navBar";
import AdminDash from "./Dashboard/adminDash";
import GuideManage from "./Dashboard/guideManage";
import UserManage from "./Dashboard/userManage";
import LocationPlan from "./TripPlanningAdmin/location";
import AdminTripGuide from "./TripPlanningAdmin/tripPlaning";
import TripDemoList from "./Dashboard/tripGuideList"
import FooterWithSocialLinks from "../../components/footer/footer";
 import Table from "./Table/table";

function dashboard() {
  const [displayedComponent, setDisplayedComponent] = useState("myDashboard");

  return (
    <div>
      <AdminNavbar />
      <div className="flex flex-row ">
        <AdminSideNav setDisplayedComponent={setDisplayedComponent} />
        <div className="w-full mt-4">
          {displayedComponent === "myDashboard" && (
            <div className="my-trip-plans-class">
              <AdminDash />
            </div>
          )}
          {displayedComponent === "manageGuide" && (
            <div className="my-trip-plans-class">
              <GuideManage />
            </div>
          )}
          {displayedComponent === "manageUser" && (
            <div className="w-full ">
              <UserManage />
            </div>
          )}
          {displayedComponent === "adminTripPlan" && (
            <div className="w-full ">
              <LocationPlan setDisplayedComponent={setDisplayedComponent} />
            </div>
          )}
          {displayedComponent === "adminTripPlanStart" && (
            <div className="w-full ">
              <AdminTripGuide />
            </div>
          )}

          {displayedComponent === "tripDemoList" && (
            <div className="w-full ">
              <TripDemoList/>
            </div>
          )}
           <FooterWithSocialLinks/>

        </div>
        
      </div>
      
    </div>
  );
}

export default dashboard;
 
