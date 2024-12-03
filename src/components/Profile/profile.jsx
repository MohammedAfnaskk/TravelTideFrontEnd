import React, { useState } from 'react';
import ProfileMapComponent from './profileMap';
import { ComplexNavbar } from '../../pages/GuideUI/GuideNavbar/navbar';
import { UserComplexNavbar } from '../../pages/UserUI/Navbar/navbar/';
import jwt_decode from 'jwt-decode';
import MyTripPlans from './planningDetails';
import Footer from '../footer/footer';
import { SideMenuBar } from './sideMenuBar';
import { Invitation } from './tripInvitations';
import { ManageTripmates } from './manageTripmates';
import JoinedTrips from './JoinedTrips';
import { ManageTripmatesGuide } from './manageTripmatesGuide';

const Profile = () => {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const role = decode.role;
  const [displayedComponent, setDisplayedComponent] = useState('myTripPlans');
  
  return (
    <>
      {role === 'guide' ? (
        <ComplexNavbar />
      ) : (
        <UserComplexNavbar />
      )}

      <ProfileMapComponent />

      <div className="flex flex-col lg:flex-row gap-14 mx-4 sm:mx-6 lg:mx-40 mt-4">
        <div className="w-full lg:w-1/4 ">
          <SideMenuBar setDisplayedComponent={setDisplayedComponent} />
        </div>

        <div className="w-full lg:w-3/4 mt-4">
          {displayedComponent === 'myTripPlans' && (
            <div className="my-trip-plans-class">
              <MyTripPlans />
            </div>
          )}

          {displayedComponent === 'joinedTripmates' && (
            <div className="my-trip-plans-class">
              <ManageTripmatesGuide />
            </div>
          )}

          {displayedComponent === 'manageTripmates' && (
            <div className="my-trip-plans-class">
              <ManageTripmates />
            </div>
          )}

          {displayedComponent === 'joinedTrips' && (
            <div className="my-trip-plans-class">
              <JoinedTrips />
            </div>
          )}

          {displayedComponent === 'invitation' && (
            <div className="w-full">
              <Invitation />
            </div>
          )}

        </div>
      </div>

      <Footer />
      
    </>
  );
};

export default Profile;
