import React, { useState, useEffect } from 'react'
import MapComponent from "../../GoogleMap/googleMap";
import { ComplexNavbar } from "../../../components/Navbar/navbar";
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import PlaceCard from './PlaceListCard';
import { userAxiosInstant } from "../../../utils/axiosUtils";
 


  
 
export const TripDetailsPage = () => {

  const [tripDetails, setTripDetails] = useState([]);
   
  useEffect(() => {
    userAxiosInstant
      .get('/travel_manager/main-place/')
      .then((response) => {
        console.log('Response Data:', response.data); // Log the data received
        setTripDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); 


    return (
      <>
        <div className="relative overflow-y-auto">
          {tripDetails.map((tripDetail) => (
            <div key={tripDetail}>
              <img
                className="w-full lg:h-96 object-cover relative z-10"
                src={tripDetail.place_image}
                alt="nature image"
              />
              <div className="absolute top-56 lg:ml-32 h-44 ml-16 w-8/12 flex justify-items-center z-20">
                <PlaceCard tripDetails={tripDetails} />
              </div>
              <hr className="w-18 border-t border-gray-500 mt-24 mb-9 px-9" />
    
              <Card className="w-full">
                <CardBody>
                  <Typography color="blue-gray" className="mb-3 px-9 font-bold">
                    Trip Activity
                  </Typography>
                  <Typography color="blue-gray" className="mb-9 px-9">
                    {tripDetail.note}
                  </Typography>
                </CardBody>
              </Card>
    
              <hr className="w-18 border-t border-gray-500 mt-9 mb-4" />  
             <div>
              <h1 className="text-2xl font-semibold mb-4 ml-4">Trip Details</h1>

              {tripDetail.trip_planning.map((tripPlace, index) => (

               <div className="flex items-center p-4 border rounded shadow"key={index}>
                  <div className="flex-1 flex " >
                    <div className="text-lg">
                      <p className="text-lg font-bold">{tripPlace.place}</p>
                      <p className="text-sm mt-2">{tripPlace.description}</p>
                      <p className="text-sm mt-4">Date: {tripPlace.date}</p>
                    </div>
                    <img
                      src={tripPlace.image}
                      alt="Trip"
                      className="w-44 h-28 object-cover rounded ml-auto"
                    />
                  </div>
                  </div>
                ))}
            </div>
            </div>
          ))}
        </div>
      </>
    );
    }
   
  

const TripPage = () => {
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
    <>
    <div className="flex">
      
      <div className=" lg:w-7/12">
         <TripDetailsPage />
      </div>
      <div className="fixed top-0 right-0  lg:w-5/12">
      {screenWidth >= 750 ? (
        <MapComponent />
        ) : null}
      </div>
    </div>
    </>
  );
};

export default TripPage;
 