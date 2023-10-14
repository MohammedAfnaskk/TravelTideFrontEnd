import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    
  } from "@material-tailwind/react";
import { useSelector } from 'react-redux';

  export default function SimpleCard() {
    const mainPlaceData = useSelector((state)=> state.user.MainPlace);
    const place = mainPlaceData.main_place;
    const startDate = mainPlaceData.start_date
    ? new Date(mainPlaceData.start_date).toLocaleDateString()
    : "";
    const endDate = mainPlaceData.end_date
    ? new Date(mainPlaceData.end_date).toLocaleDateString()
    : "";

    console.log('Main Place Data:', mainPlaceData); // Log the entire object
    console.log('Place:', place); // Log the 'place' variable

    return (
      <Card className="w-full">
        <CardBody>
          <Typography  color="blue-gray" className="mb-20 font-bold text-2xl">
            Trip to {place}
          </Typography>
          <Typography className='text-sm'>
            Start: {startDate} &nbsp; End: {endDate}

          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* Add any footer content here */}
        </CardFooter>
      </Card>
    );
  }
  