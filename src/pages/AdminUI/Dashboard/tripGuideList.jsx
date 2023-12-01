import { GuideAxiosInstant } from "../../../utils/axiosUtils";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";


const MyTripPlans = () => {
  const navigate = useNavigate();
  const [myTrips, setMyTrips] = useState([]);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [size, setSize] = React.useState(null);

  const handleOpen = (value) => setSize(value);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const adminId = decode.user_id;

    GuideAxiosInstant.get(`/travel_manager/user_trip_plans/${adminId}/`)
      .then((response) => {
        console.log("Response Data:", response.data);
        setMyTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const confirmDelete = () => {
    if (tripToDelete) {
      GuideAxiosInstant.delete(
        `/travel_manager/admin-guiding-trips/${tripToDelete}/`
      )
        .then((response) => {
          console.log("Trip Plan deleted successfully:", response.data);
          toast.success("Trip Plan deleted successfully");
          setMyTrips(myTrips.filter((trip) => trip.id !== tripToDelete));
        })
        .catch((error) => {
          console.error("Error deleting Trip Plan:", error);
          toast.error("Error deleting Trip Plan");
        })
        .finally(() => {
          setTripToDelete(null);
        });
    }
  };

  const MainPlaceUpdateForm = ({ mainPlaceId, initialIsShow }) => {
    const [isShow, setIsShow] = useState(initialIsShow);

    useEffect(() => {
      setIsShow(initialIsShow);
    }, [initialIsShow]);

    const handleCheckboxChange = () => {
      setIsShow((prevValue) => !prevValue);
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();

      GuideAxiosInstant.patch(
        `/travel_manager/admin-guiding-trips/${mainPlaceId}/`,
        { is_show: isShow },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
 
          const message = response.data.is_show
          ? "Trip Guiding is now active on the UserSide"
          : "Trip Guiding is currently inactive";

          toast.success(message);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.error("MainPlace not found:", error.response.data);
            toast.error("MainPlace not found");
          } else {
            console.error("Error updating MainPlace:", error);
            toast.error("Error updating MainPlace");
          }
        });
    };
    return (
      <form onSubmit={handleFormSubmit}>
        <label>
          Show on UserSide:
          <input
            type="checkbox"
            checked={isShow}
            onChange={handleCheckboxChange}
          />
        </label>
        <Button
          type="submit"
          className=" bg-[#f75940] hover:bg-[#e54632] ml-4 "
          size="sm"
          onClick={(e) => e.stopPropagation()}
        >
          Update
        </Button>
      </form>
    );
  };

  return (
    <>
      <div>
        <div className="flex items-start h-12 text-black text-4xl font-bold mt-4">
          Trip Guiding List
        </div>
        <hr className="w-full border-t border-gray-500 mt-3 " />

        <div className=" mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 ">
          {myTrips.map((trip, index) => (
            <div
              key={index}
              className="w-64 rounded overflow-hidden mx-auto"
              onClick={(e) => {
                if (
                  e.target.type !== "checkbox" &&
                  !e.target.classList.contains("delete-icon")
                ) {
                  navigateToTripPage(trip.id);
                }
              }}
            >
              <Link
                to={{
                  pathname: `/admin/guiding-page-admin/${trip.id}`,
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
              </Link>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Stop the click event from propagating to the parent div
                  setTripToDelete(trip.id);
                  handleOpen("sm");
                }}
                variant="gradient"
              >
                Delete TripGuiding:
                <FontAwesomeIcon className="ml-2" icon={faTrash} />
              </button>
              <MainPlaceUpdateForm
                mainPlaceId={trip.id}
                initialIsShow={trip.is_show}
              />
            </div>
          ))}
        </div>
        <Dialog open={size === "sm"} size={size || "sm"} handler={handleOpen}>
          <DialogHeader>Delete Confirmation</DialogHeader>
          <DialogBody>Are you sure you want to delete this trip?</DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleOpen(null);
                setTripToDelete(null);
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                confirmDelete();
                handleOpen(null);
              }}
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default MyTripPlans;
