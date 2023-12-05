import { GuideAxiosInstant } from "../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import UserProtected from "../../routes/ProtuctedRoutes/UserProtected";

const JoinedTrips = () => {
  const navigate = useNavigate();
  const [myTrips, setMyTrips] = useState([]);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [size, setSize] = React.useState(null);
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const userRole = decode.role;
  const handleOpen = (value) => setSize(value);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const userId = decode.user_id;

    GuideAxiosInstant.get(`/payments/user-payment-details/${userId}/`)
      .then((response) => {
        console.log("Response Data:", response.data);

        setMyTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 

  
 

  return (
    <>
      <div>
        <div className="flex text-2xl font-bold gap-20 justify-center">
          <h4> JOINED TRIPS</h4>
        </div>
        <hr className="w-full border-t border-gray-500 mt-3 " />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 ">
          {myTrips.map((trip, index) => (
            <div
              key={index}
              className="w-64 rounded overflow-hidden mx-auto"
              onClick={() => navigate(`/user/trip-package-details/${trip.trip_details.id}`)}

            >
              <img
                className="w-full h-40 rounded-lg transform hover:scale-105  transition-transform"
                src={`http://localhost:8000${trip.trip_details.place_image}`}
                />
              <div className="font-bold text-xl mb-2 mt-2">
                {trip.trip_details.main_place}
              </div>
             
               
            </div>
          ))}
        </div>
 
      </div>
    </>
  );
};

export default JoinedTrips;
