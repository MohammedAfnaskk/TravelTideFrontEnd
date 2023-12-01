import React, { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios"; // Import Axios
import { clearMainPlace, setMainPlace } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LocationPlan(props) {
  const { setDisplayedComponent } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    main_place: "",
    start_date: null,
    end_date: null,
  });

  const { main_place, start_date, end_date } = state;

  const handleStartPlanning = () => {
    if (!main_place) {
      toast.error("Please enter a place");
      return;
    }

    if (!start_date || !end_date) {
      toast.error("Please select a date range");
      return;
    }
    dispatch(clearMainPlace());
    dispatch(setMainPlace(state));

    if (main_place != "" || start_date != "" || end_date != "") {
       setDisplayedComponent("adminTripPlanStart")

    }
  };

  const mainPlaceData = useSelector((state) => state.user.MainPlace);
  console.log("Main Place Data:", mainPlaceData.main_place); // Access the main_place property
  console.log("fghjk", start_date);
  console.log("fghjkghj", end_date);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setState({ ...state, start_date: start, end_date: end });
  };
  // Function to fetch place data based on user input
  const fetchPlaceData = async (placeName) => {
    try {
      const response = await axios.get(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${placeName}&country=in`,
        {
          headers: {
            "X-RapidAPI-Key":
              "4b3af2d8e8mshb2516614a760a67p1540aajsn26c861982f1f",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
          },
        }
      );

      console.log(response.data);

      // Check if the 'name' field exists in the response data
      if (response.data && response.data.name) {
        const placeNameFromAPI = response.data.name;

        // Display the name in the toast message
        toast.success(`Place: ${placeNameFromAPI}`);
      } else {
        toast.error("Place name not found in the response");
      }

      // Handle the response data here, e.g., set it in state
    } catch (error) {
      console.error(error);
      const errorMessage = error.response
        ? error.response.data.message // If the error comes from the API response
        : "An error occurred!"; // If it's a generic error

      toast.error(errorMessage);
    }
  };

  return (
    <>
      <header className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-20 font-bold ">
        Guide a Demo Trip
      </header>

      <div className=" flex items-center justify-center mt-16">
        <div className=" lg:w-[38rem] ">
          {/* Place Input */}
          <div className="mb-4">
            <Input
              type="text"
              label="Select Place"
              value={main_place}
              onChange={(e) =>
                setState({ ...state, main_place: e.target.value })
              }
              onBlur={() => fetchPlaceData(main_place)}
            />
          </div>

          {/* Date Picker  */}
          <div className="mb-4 relative">
            <Input
              type="text"
              label="Select Date Range"
              onClick={() => setShowDatePicker(!showDatePicker)}
              value={
                start_date && end_date
                  ? `${start_date.toLocaleDateString()} - ${end_date.toLocaleDateString()}`
                  : ""
              }
            />
            {showDatePicker && (
              <DatePicker
                selected={start_date}
                onChange={handleDateChange}
                startDate={start_date}
                endDate={end_date}
                selectsRange
                inline
                className="absolute top-12 left-0 z-10"
              />
            )}
          </div>
        </div>
      </div>
      <div class=" flex justify-center mt-16 ">
        <Button
          className="bg-[#f75940] rounded-full h-14 text-white py-2 px-4"
          onClick={handleStartPlanning} // Dispatch the action when the button is clicked
        >
          Start Planning
        </Button>
      </div>
    </>
  );
}
