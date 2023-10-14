import React, { useState, useEffect } from 'react'
import MapComponent from "../../GoogleMap/googleMap";
import TripPlanningTable from '../TripPlanningGuide/tripPlaning'



const PlanningPage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return (
    <div className="flex">
      <div className=" lg:w-7/12">
         <TripPlanningTable />
      </div>
      <div className="fixed top-0 right-0  lg:w-5/12">
      {screenWidth >= 750 ? (
        <MapComponent/>
        ) : null}
      </div>
    </div>
  );
};

export default PlanningPage;