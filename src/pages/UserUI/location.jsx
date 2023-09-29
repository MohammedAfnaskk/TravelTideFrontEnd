import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Button } from "@material-tailwind/react";
import { ComplexNavbar } from "../../components/Navbar/navbar";
  
    
 
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

  return (
    <>
    <ComplexNavbar/>
    <header className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-20 font-bold ">
  Plan a new trip
</header>
    <div class=" flex items-center justify-center mt-16 ">

       <div className="w-[38rem]">
        {/* Place Input */}
        <div className="mb-4">
          <Input
            type="text"
            label="Select Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
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
