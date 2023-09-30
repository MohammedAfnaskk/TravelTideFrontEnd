import React, { useState, useEffect } from 'react'
import MapComponent from "../googleMap";
import { ComplexNavbar } from "../../../components/Navbar/navbar";
import placeImage from '../../../assets/image/adminbg.jpg';
   

import {
    Card,
    CardBody,
    CardFooter,
    Textarea ,
    Input,
    Typography,
    
  } from "@material-tailwind/react";
   
  export function PlaceCard() {
    return (
      <Card className="w-full " color='blue-gray'>
        <CardBody>
          <Typography  color="blue-gray" className="mb-20 font-bold text-2xl">
            Place Name
          </Typography>
          <Typography className='text-sm'>
            Date: September 27, 2023
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* Add any footer content here */}
        </CardFooter>
      </Card>
    );
  }
  
 
  const TripDetails = ({ place, description, date, image }) => {

    return (
        <>
 
    <div className="relative overflow-y-auto" > 
        <img
          className="w-full lg:h-96 object-cover relative z-10"
          src={placeImage}
          alt="nature image"
        />
        <div className="absolute top-56 lg:ml-32  h-44 ml-16    w-8/12  flex justify-items-center z-20">
          <PlaceCard />
        </div>
        <hr className="w-18 border-t border-gray-500 mt-24 " />


        <hr className="w-18 border-t border-gray-500 mt-96 " />
        <div className="flex items-center p-4 border rounded shadow">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Trip Details</h1>
          <p className="text-lg">Place: {place}</p>
          <p className="text-lg">Description: {description}</p>
          <p className="text-lg">Date: {date}</p>
        </div>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Trip"
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>
    </div> 
      </>   
    );
  };
  
   
   
  

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
    <div className="flex">
      <div className=" lg:w-7/12">
         <TripDetails />
      </div>
      <div className="fixed top-0 right-0  lg:w-5/12">
      {screenWidth >= 750 ? (
        <MapComponent />
        ) : null}
      </div>
    </div>
  );
};

export default TripPage;
 