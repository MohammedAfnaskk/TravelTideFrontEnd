import { userAxiosInstant } from "../../../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripPackageList = (props) => {
  const { filteredUserList } = props;
  const [mainTrips, setMainTrips] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    userAxiosInstant
      .get("/travel_manager/guide-trip-package/")
      .then((response) => {
        console.log("Response Data:", response.data);
        setMainTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  // Combine mainTrips and filteredUserList
  const tripsToDisplay = filteredUserList.length > 0 ? filteredUserList : mainTrips;

  return (
    <div className="mt-9 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:mx-44">
      {tripsToDisplay.length === 0 && !error ? (
        <div className="flex items-center justify-center w-full h-[300px] bg-gray-200 rounded-lg mx-auto text-center text-gray-700 font-bold">
          <p>No results found.</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center w-full h-[300px] bg-red-200 rounded-lg mx-auto text-center text-gray-700 font-bold">
          <p>Error loading trips. Please try again later.</p>
        </div>
      ) : (
        tripsToDisplay.map((trip, index) => (
          <Link
            to={{
              pathname: `/user/trip-package-details/${trip.id}`,
              state: { tripId: trip.id },
            }}
            key={index}
            className="w-64 rounded overflow-hidden mx-auto"
          >
            <img
              className="w-full h-40 rounded-lg transform hover:scale-105 transition-transform"
              src={trip.place_image}
              alt={trip.main_place}
              loading="lazy" // Add lazy loading
            />

            <div className="font-bold text-xl mb-2 mt-2">
              {trip.main_place}
            </div>
            <p className="text-black-700 font-bold">
              Guide: {trip.user_name}
            </p>

            <p
              className="text-gray-700 text-base mt-2"
              style={{ maxHeight: "3em", overflow: "hidden" }}
            >
              {trip.note}
            </p>
            <p className="text-black-700 text-sm mt-2">
              Start: {trip.start_date} End: {trip.end_date}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default TripPackageList;
