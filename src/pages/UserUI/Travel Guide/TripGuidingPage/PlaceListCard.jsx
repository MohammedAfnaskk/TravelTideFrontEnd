import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function PlaceCard(props) {
  const { tripDetails } = props;

  const cardStyle = {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
  };

  return (
    <Card className="w-full" style={cardStyle}>
      <CardBody key={tripDetails.id}>
        <div className="flex flex-row">
          <Typography color="blue-gray" className="mb-20 font-bold text-2xl">
            Trip to {tripDetails.main_place}
          </Typography>
          <Typography color="blue-gray" className="mb-20 ml-48 text-1xl">
            For instructional purposes
          </Typography>
        </div>
        <Typography className="text-sm">
          Start Date: {tripDetails.start_date} &nbsp; End Date:{" "}
          {tripDetails.end_date}
        </Typography>
      </CardBody>

      <CardFooter className="pt-0"></CardFooter>
    </Card>
  );
}
