import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Button } from "@material-tailwind/react";
import { ComplexNavbar } from "../../components/Navbar/navbar";
import axios from 'axios'; // Import Axios

    
 
export default function LocationPlan() {
  const [place, setPlace] = useState("");
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
      // Handle the response data here, e.g., set it in state
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
            className="bg-[#f75940] rounded-full h-14 text-white py-2 px-4" >
            Start Planning
    </Button>
    </div>
     </>
  );
}
