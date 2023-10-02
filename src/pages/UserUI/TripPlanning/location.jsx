import React, { useState } from "react";
import { toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Button } from "@material-tailwind/react";
import { ComplexNavbar } from "../../../components/Navbar/navbar";
import axios from 'axios'; // Import Axios
import { setMainPlace} from '../../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

    
 
export default function LocationPlan() {
  const dispatch = useDispatch();
  const [place, setPlace] = useState('');
  const mainPlaceData = useSelector((state) => state.user.MainPlace);
  console.log('Main Place Data:', mainPlaceData);


  const handleStartPlanning = () => {
    const mainPlaceData = { place: place };

     dispatch(setMainPlace(mainPlaceData)); // Dispatch the action to update MainPlace
  };
   

 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  
  // Function to fetch place data based on user input
  const fetchPlaceData = async (placeName) => {
    try {
      const response = await axios.get(
        `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${placeName}&country=in`,
        {
          headers: {
            'X-RapidAPI-Key': '4b3af2d8e8mshb2516614a760a67p1540aajsn26c861982f1f',
            'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
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
    <ComplexNavbar/>
    <header className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-20 font-bold ">
  Plan a new trip

</header>

        <div className=" flex items-center justify-center mt-16">
        <div className=" lg:w-[38rem] ">
          {/* Place Input */}
          <div className="mb-4">
            <Input
              type="text"
              label="Select Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onBlur={() => fetchPlaceData(place)} 
            />
          </div>

        {/* Date Picker  */}
        <div className="mb-4 relative">
          <Input
            type="text"
            label="Select Date Range"
            onClick={() => setShowDatePicker(!showDatePicker)}
            value={
              startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : ""
            }
          />
          {showDatePicker && (
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
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
