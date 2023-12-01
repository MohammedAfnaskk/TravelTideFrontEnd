import React, { useState, useEffect } from "react";
import MapComponent from "../../GoogleMap/googleMap";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PlaceCard from "./PlaceListCard";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import { useLocation } from "react-router-dom";
import { ComplexNavbar } from "../NavbarSemi/Nav";
import FooterWithSocialLinks from "../../../components/footer/footer";
import { useNavigate } from 'react-router-dom';

export const TripDetailsPage = () => {
  const location = useLocation();
  const id = location.state && location.state.id;
  const [tripDetails, setTripDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    userAxiosInstant
      .get(`/travel_manager/MainPlaceViewSetsingleView/${id}`)
      .then((response) => {
        console.log("Response Data:", response.data); // Log the data received
        setTripDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [id]);

  const handleNavigate=()=>{
       
      navigate('/user/edit-trip',{ state: { id }})
  }



  return (
    <>
      <ComplexNavbar />

      <div className="relative overflow-y-auto">
        {error && <p>Error fetching trip details: {error.message}</p>}
        {tripDetails && (
          <div>
            <img
              className="w-full lg:h-96 object-cover relative z-10"
              src={tripDetails.place_image}
              alt="nature image"
            />
            <div className="absolute top-56 lg:ml-32 h-44 ml-16 w-8/12 flex justify-items-center z-20">
              <PlaceCard tripDetails={tripDetails} />
            </div>

            <div className="mt-16 ml-96">
              <Card className="w-80 bg-white hover:bg-blue-gray-50">
                <CardBody>
                  <Typography
                    color="blue-gray"
                    className="mb-4 font-bold text-2xl  "
                  >
                    Budget: ₹ {tripDetails.budget}
                  </Typography>
                  {/* <div className="mt-12 w-auto px-10 mb-12"> */}
                  <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-40 rounded-full">
                    Join Now
                  </div>
 
                  {/* </div> */}
                </CardBody>
              </Card>
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
          </div>
        )}
        <div className="mt-12 w-auto px-10 mb-12">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleNavigate}
          >
            Edit TripPlan
          </button>
        </div>
        <FooterWithSocialLinks />
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

export default TripPage;
