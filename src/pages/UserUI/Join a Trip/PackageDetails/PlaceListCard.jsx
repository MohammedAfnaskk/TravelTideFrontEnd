import React from 'react';
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function PlaceCard(props) {
   const { tripDetails } = props; 
  return (  
    <Card className="w-full">
         <CardBody key={tripDetails.id}>
          <Typography color="blue-gray" className="mb-20 font-bold text-2xl">
            Trip to {tripDetails.main_place}
          </Typography>
          <Typography className='text-sm'>
            Start Date: {tripDetails.start_date} &nbsp; End Date: {tripDetails.end_date}
          </Typography>
        </CardBody>
      
      <CardFooter className="pt-0">
       </CardFooter>
    </Card>
  );
}
