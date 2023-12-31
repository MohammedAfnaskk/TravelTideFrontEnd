import React from 'react';
import {useSelector } from 'react-redux';
import { InviteFriend } from '../../../components/InviteDialog/invite';
 

import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function PlaceCard(props) {
   const { tripDetails } = props;

   console.log("------------>",tripDetails);
 
  return (
    <Card className="w-full">
          <CardBody key={tripDetails.id}>
          <Typography color="blue-gray" className="mb-20 font-bold text-2xl">
            Trip to {tripDetails.main_place}
          </Typography>
          <Typography className='text-sm flex '>
            Start Date: {tripDetails.start_date} &nbsp; End Date: {tripDetails.end_date}
            <InviteFriend/>
          </Typography>
        </CardBody>
       <CardFooter className="pt-0">
 
       </CardFooter>
    </Card>
  );
}
