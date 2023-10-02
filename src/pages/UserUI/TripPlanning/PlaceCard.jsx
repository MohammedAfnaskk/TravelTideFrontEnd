import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    
  } from "@material-tailwind/react";
   
  export default function SimpleCard() {
    return (
      <Card className="w-full">
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
  