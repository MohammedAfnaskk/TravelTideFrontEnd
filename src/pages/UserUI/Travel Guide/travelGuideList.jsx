import { userAxiosInstant } from "../../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TripPackageList = (props) => {
  const { filteredUserList } = props;
  const [TripGuiding, setMainTrips] = useState([]);
  const [error, setError] = useState(null);

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
    <div className="mt-9 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:mx-44">
      {filteredUserList.length > 0 ? (
        filteredUserList.map((trip, index) => (
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
              alt={trip.main_place}
              loading="lazy"
            />
            <div className="font-bold text-xl mb-2 mt-2">{trip.main_place}</div>
            <p
              className="text-gray-700 text-base mt-2"
              style={{ maxHeight: "3em", overflow: "hidden" }}
            >
              {trip.note}
            </p>
          </Link>
        ))
      ) : TripGuiding.length > 0 ? (
        TripGuiding.map((trip, index) => (
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
            <div className="font-bold text-xl mb-2 mt-2">{trip.main_place}</div>
            <p
              className="text-gray-700 text-base mt-2"
              style={{ maxHeight: "3em", overflow: "hidden" }}
            >
              {trip.note}
            </p>
          </Link>
        ))
      ) : (
        <div className="w-full p-12 bg-gray-200 rounded-lg text-center mx-auto  max-w-md h-[300px] flex flex-col justify-center items-center">
          <h3 className="text-xl text-gray-700 font-semibold">
            No trip details available at the moment.
          </h3>
          <p className="text-gray-500 mt-4">
            Please check back later or try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default TripPackageList;
