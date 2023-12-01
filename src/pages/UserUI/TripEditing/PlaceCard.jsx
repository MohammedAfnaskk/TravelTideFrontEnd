import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { clearMainPlace, setMainPlace } from "../../../redux/userSlice";

export default function PlaceCard(props) {
  const dispatch = useDispatch();
  console.log("Props on mount:", props);

  const [state, setState] = useState({});

  useEffect(() => {
    setState({
      main_place: props.props?.main_place || "",
      start_date: props.props?.start_date
        ? new Date(props.props.start_date)
        : null,
      end_date: props.props?.end_date ? new Date(props.props.end_date) : null,
    });
  }, [props.props]);

  const { main_place, start_date, end_date } = state;
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    dispatch(clearMainPlace());
    dispatch(setMainPlace(state));
  }, [state, dispatch]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setState((prevState) => ({
      ...prevState,
      start_date: start,
      end_date: end,
    }));
  };

  const fetchPlaceData = async (placeName) => {
    // Your fetchPlaceData function remains unchanged
  };

  const handleMainPlaceChange = (e) => {
    const newMainPlace = e.target.value;
    setState((prevState) => ({ ...prevState, main_place: newMainPlace }));
    fetchPlaceData(newMainPlace); // Fetch place data when main place changes
  };

  return (
    <Card className="w-full">
      <CardBody>
        <Typography color="blue-gray" className="mb-4 font-bold text-2xl">
          Trip Details
        </Typography>

        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Place Input */}
          <div className="mb-4 lg:w-1/2">
            <label className="block mb-2 text-sm font-medium text-blue-gray-700">
              Select Place
            </label>
            <Input
              type="text"
              placeholder="Enter place name"
              value={main_place}
              onChange={handleMainPlaceChange}
            />
          </div>

          {/* Date Range Input */}
          <div className="mb-4 lg:w-1/2">
            <label className="block mb-2 text-sm font-medium text-blue-gray-700">
              Select Date Range
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Select date range"
                value={
                  start_date && end_date
                    ? `${start_date.toLocaleDateString()} - ${end_date.toLocaleDateString()}`
                    : ""
                }
                onClick={() => setShowDatePicker(!showDatePicker)}
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
      </CardBody>
      <CardFooter className="pt-0">
        {/* Add any footer content here */}
      </CardFooter>
    </Card>
  );
}
