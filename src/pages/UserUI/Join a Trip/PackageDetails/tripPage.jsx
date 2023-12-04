import React, { useState, useEffect } from "react";
import MapComponent from "../../../GoogleMap/googleMap";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PlaceCard from "./PlaceListCard";
import { userAxiosInstant } from "../../../../utils/axiosUtils";
import { ComplexNavbar } from "../../NavbarSemi/Nav";
import Footer from "../../../../components/footer/footer";
import { useParams } from "react-router-dom";
import ChatBox from "../../ChatBox/chatBox";
import HomePages from "../../../../components/Payment/payment";

export const TripDetailsPage = () => {
  const { id } = useParams();

  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await userAxiosInstant.get(`/travel_manager/MainPlaceViewSetsingleView/${id}`);
      console.log("Response Data:", response.data);
      setTripDetails(response.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

 
  return (
    <>
      <ComplexNavbar />
      <div className="relative overflow-y-auto">
        {error && <p>Error fetching trip details: {error.message}</p>}
        {tripDetails && (
          <div>
            <img
              className="w-full h-96 object-cover relative z-10"
              src={tripDetails.place_image}
              alt="nature image"
            />
            <div className="absolute top-56 lg:ml-32 h-44 ml-16 w-8/12 flex justify-items-center z-20">
              <PlaceCard tripDetails={tripDetails} />
            </div>

            <hr className="w-18 border-t border-gray-500 mt-10 mb-9 px-9" />
            <div className="mt-10 ml-36">
              <ChatBox recieverid={tripDetails.user} />
            </div>
            <div className="flex  mx-36 gap-6">
                <div className="rounded-lg  w-full bg-gray-100 p-4 text-black">
                <div className="text-lg font-semibold">Payment Option</div>
                <div className="text-base"><HomePages props={tripDetails}/></div>
              </div>
            
              <div className="rounded-lg  bg-gray-200 p-4 text-black ">
                <div className="text-lg font-semibold">Budget</div>
                <div className="text-3xl font-bold mt-2 ml-8">
                  ₹{tripDetails.budget}
                </div>
              </div>
              </div>

            <hr className="w-18 border-t border-gray-500 mt-24 mb-9 px-9" />

            <Card className="w-full">
              <CardBody>
                <Typography color="blue-gray" className="mb-3 px-9 font-bold">
                  Trip Activity
                </Typography>
                <Typography color="blue-gray" className="mb-9 px-9">
                  {tripDetails.note}
                </Typography>
              </CardBody>
            </Card>

            <hr className="w-18 border-t border-gray-500 mt-9 mb-4" />
            <div>
              <h1 className="text-2xl font-semibold mb-4 ml-4">Trip Details</h1>

              {tripDetails.trip_planning.map((tripPlace, index) => (
                <div
                  className="flex items-center p-4 border rounded shadow"
                  key={index}
                >
                  <div className="flex-1 flex ">
                    <div className="text-lg">
                      <p className="text-lg font-bold">{tripPlace.place}</p>
                      <p className="text-sm mt-2" style={{ width: "650px" }}>
                        {tripPlace.description}
                      </p>
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
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

const PackageDetails = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex">
        <div className=" lg:w-7/12">
          <TripDetailsPage />
        </div>
        <div className="fixed top-0 right-0  lg:w-5/12">
          {screenWidth >= 750 ? <MapComponent /> : null}
        </div>
      </div>
    </>
  );
};

export default PackageDetails;
