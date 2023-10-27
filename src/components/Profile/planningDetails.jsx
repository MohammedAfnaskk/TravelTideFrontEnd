import { GuideAxiosInstant } from "../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const MyTripPlans = () => {
  const navigate = useNavigate();
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const guideId = decode.user_id;

    GuideAxiosInstant.get(`/travel_manager/user_trip_plans/${guideId}`)
      .then((response) => {
        console.log("Response Data:", response.data);
        setMyTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigateToTripPage = (id) => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);

    if (decode.role === 'guide') {
      navigate(`/guide/trip-page-guide`, { state: { id } });
    } else {
      navigate(`/user/trip-page`, { state: { id } });
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row gap-20 justify-center">
          <button className="text-black font-bold hover:text-[#e54632] hover:underline">
            Trip plans
          </button>
          <button className="text-black font-bold hover:text-[#e54632] hover:underline">
            Guides
          </button>
        </div>
        <hr className="w-full border-t border-gray-500 mt-3 " />


        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 ">
          {myTrips.map((trip, index) => (
            <div
              key={index}
              className="w-64 rounded overflow-hidden mx-auto"
              onClick={() => navigateToTripPage(trip.id)}
            >
              <img
                className="w-full h-40 rounded-lg transform hover:scale-105 transition-transform"
                src={trip.place_image}
                alt="Sunset in the mountains"
              />
              <div className="font-bold text-xl mb-2 mt-2">
                {trip.main_place}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTripPlans;
