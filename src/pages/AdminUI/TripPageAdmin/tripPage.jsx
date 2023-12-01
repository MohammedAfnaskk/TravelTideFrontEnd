import React, { useState, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMap";
import { ComplexNavbar } from "../../GuideUI/NavbarSemi/Nav";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PlaceCard from "./PlaceListCard";
import { GuideAxiosInstant } from "../../../utils/axiosUtils";
import { useLocation } from "react-router-dom";
import Footer from "../../../components/footer/footer";

export const TripDetailsPage = () => {
  const location = useLocation();
  const id = location.state && location.state.id;

  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    GuideAxiosInstant.get(`/travel_manager/MainPlaceViewSetsingleView/${id}`)
      .then((response) => {
        console.log("Response Data:", response.data);
        setTripDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [id]);

  return (
    <>
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
            <hr className="w-18 border-t border-gray-500 mt-24 mb-9 px-9" />

            <div className=" rounded-lg bg-gray-300 p-4 text-black grid grid-cols-2 gap-80 mx-20">
              <div className="col-span-1">
                <div className="text-4xl font-semibold mt-7 ml-10">Budget</div>
                <div className="text-3xl font-bold mt-2 ml-28">
                  ₹{tripDetails.budget}
                </div>
              </div>

              <div className="col-span-1">
                <div className="text-lg font-semibold mt-7">Payment Option</div>
                <div className="text-base">Credit Card</div>
              </div>
            </div>

            <hr className="w-18 border-t border-gray-500 mt-10 mb-9 px-9" />

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
              <div className="mt-12 w-auto px-10 mb-12">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Edit TripPlan
                </button>
              </div>
              <Footer />
            </div>
          </div>
        )}
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex">
           <TripDetailsPage />
        
      </div>
    </>
  );
};

export default TripPage;
