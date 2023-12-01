import { userAxiosInstant } from "../../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripPackageList = (props) => {
  const Search = props
  const [TripGuiding, setMainTrips] = useState([]);

  useEffect(() => {
    userAxiosInstant
      .get("/travel_manager/trip-guiding/")
      .then((response) => {
        console.log("Response Data:", response.data);
        setMainTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  return (
    <div className="mt-9 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10  lg:mx-44">
            {TripGuiding.map(
        (trip, index) => (
           (
            <Link
              to={{
                pathname: `/user/trip-guiding-details/${trip.id}/`,
                state: { tripId: trip.id },
              }}
              key={index}
              className="w-64 rounded overflow-hidden mx-auto"
            >
              <img
                className="w-full h-40 rounded-lg transform hover:scale-105 transition-transform"
                src={trip.place_image}
                alt="Sunset in the mountains"
              />

              <div className="font-bold text-xl mb-2 mt-2">
                {trip.main_place}
              </div>
              

              <p
                className="text-gray-700 text-base mt-2"
                style={{ maxHeight: "3em", overflow: "hidden" }}
              >
                {trip.note}
              </p>
               
            </Link>
          )
        )
      )}
    </div>
  );
};

export default TripPackageList;
