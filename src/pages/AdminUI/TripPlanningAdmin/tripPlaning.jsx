import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Textarea, Input } from "@material-tailwind/react";
import PlaceCard from "./PlaceCard";
import placeImage from "../../../assets/image/adminbg.jpg";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { TripPlanning, TripPlanningData } from "../../../services/userApi";
import { useNavigate } from "react-router-dom";
 
const AdminTripGuide = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const decode = jwt_decode(token);
  

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    setnoteBudget({
      ...notebuget,
      place_image: selectedImage,
    });
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const [notebuget, setnoteBudget] = useState({
    Note: "",
    Budget: "",
    place_image: null,
  });

  const { Note, Budget } = notebuget;

  const [entries, setEntries] = useState([
    {
      place: "",
      description: "",
      image: null,
      date: "",
    },
  ]);

  console.log("tripPlannig", entries);

  const handleAddEntry = () => {
    const newEntry = {
      place: "",
      description: "",
      image: null,
      date: "",
    };
    setEntries([...entries, newEntry]);
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const handleInputChange = (event, index, field) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = event.target.value;
    setEntries(updatedEntries);
  };

  const handleImageChange = (event, index) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      toast.error("Please select a valid image");
      return;
    }
    const updatedEntries = [...entries];
    updatedEntries[index].image = event.target.files[0]; // Assuming you want to store the first selected image
    setEntries(updatedEntries);
  };

  const mainPlace = useSelector((state) => state.user.MainPlace);
  const main_place = mainPlace.main_place;
  const start_date = mainPlace.start_date
    ? new Date(mainPlace.start_date).toISOString().split("T")[0]
    : "";

  const end_date = mainPlace.end_date
    ? new Date(mainPlace.end_date).toISOString().split("T")[0]
    : "";

  const note = notebuget.Note;
  const budget = notebuget.Budget;
  const imageUrl = notebuget.place_image
    ? URL.createObjectURL(notebuget.place_image)
    : placeImage;

  const handleSaveEntries = async () => {
    const formData = new FormData();

    formData.append("user", decode.user_id);
    formData.append("main_place", main_place);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("note", note);
    formData.append("budget", budget);

    // Check if 'notebudget.place_image' exists and add it to formData
    if (notebuget.place_image) {
      formData.append("place_image", notebuget.place_image);
    }

    //-------------------------validation----------------------//
    if (notebuget.place_image === null) {
      toast.error("Main Place image is required");
      return;
    }

    if (Note.trim() === "") {
      toast.error("Note field is required");
      return;
    }

    const invalidEntries = entries.some((entry) => {
      return (
        entry.place.trim() === "" ||
        entry.description.trim() === "" ||
        entry.image === null ||
        entry.date.trim() === ""
      );
    });

    if (invalidEntries) {
      toast.error(
        "Please fill in all entry fields (Place, Description, Image, Date)"
      );
      return;
    }

    if (Budget.trim() === "") {
      toast.error("Budget field is required");
      return;
    }

    try {
      const response = await TripPlanning(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      let id = 0;
      if (response.status === 201) {
        const formDataArray = entries.map((entry) => {
          const entryFormData = new FormData();
          entryFormData.append("place", entry.place);
          entryFormData.append("description", entry.description);
          entryFormData.append("date", entry.date);
          entryFormData.append("maintable_id", response.data.id);
          id = response.data.id;
          // Check if 'entry.image' exists and add it to entryFormData
          if (entry.image) {
            entryFormData.append("image", entry.image);
          }

          return entryFormData;
        });
        for (const entryFormData of formDataArray) {
          const response = await TripPlanningData(entryFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Response:", response);
        }
      }
      toast.success('Trip Plan saved successfully')
      // navigate("/admin/trip-page-admin/", { state: { id } });
 
    } catch (error) {
      console.log("response trip data", error);
      toast.error("Error while saving entries");
    }
  };

  return (
    <div>
     
 
        {/* Add more content */}
        <div className="relative overflow-y-auto">
          {/* main_place image  */}

          <div className="relative">
            <form encType="multipart/form-data">
              <input
                type="file"
                name="place_image"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </form>

            {/* Image */}
            <img
              className="w-full lg:h-64 object-cover relative z-10 cursor-pointer"
              src={imageUrl}
              alt="nature image"
              onClick={handleEditClick}
            />
          </div>

          <div className="absolute top-32 lg:ml-32  h-44 ml-16    w-8/12  flex justify-items-center z-20">
            <PlaceCard />
          </div>

          <div className=" px-10 mt-16">
            <p className="mb-2 font-bold">Note</p>
            <Textarea
              size="md"
              label="Note"
              value={Note}
              onChange={(e) =>
                setnoteBudget({ ...notebuget, Note: e.target.value })
              }
            />
          </div>

          <hr className="w-18 border-t border-gray-500 mt-10 " />

          {entries.map((entry, index) => (
            <div key={index} className="mt-10">
              <div className="mb-8   inline-flex  ml-10">
                <button
                  onClick={() => handleDeleteEntry(index)}
                  className="bg-blue-gray-300 text-dark font-bold py-2 px-4 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />{" "}
                  {/* Use the delete icon here */}
                </button>
              </div>
              <div className="  px-10">
                <p className="mb-2 font-bold">Place</p>
                <Input
                  size="lg"
                  label="Place"
                  value={entry.place}
                  onChange={(e) => handleInputChange(e, index, "place")}
                />
              </div>

              <div className="  px-10 mt-4">
                <p className="mb-2 font-bold">Description</p>
                <Textarea
                  size="md"
                  label="Description"
                  value={entry.description}
                  onChange={(e) => handleInputChange(e, index, "description")}
                />
              </div>

              <div className="w-96 px-10 mt-4">
                <label
                  htmlFor={`imageInput-${index}`}
                  className="block text-gray-700 text-sm font-bold"
                >
                  Select an Image:
                </label>
                <input
                  type="file"
                  id={`imageInput-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>

              <div className="  px-10 mt-4">
                <p className="mb-2 font-bold">Date</p>
                <Input
                  type="date"
                  label="Date"
                  value={entry.date}
                  onChange={(e) => handleInputChange(e, index, "date")}
                />
              </div>

              {/* Add another form */}
              <div className="mt-10   px-10">
                <button
                  onClick={handleAddEntry}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  + Add Another Entry
                </button>
              </div>

              <hr className="w-18 border-t border-gray-500 mt-10" />
            </div>
          ))}

          {/* Budget input field */}
          <div className="mt-4   px-10">
            <p className="mb-2 font-bold">Budget</p>
            <Input
              type="text"
              placeholder="Enter budget"
              value={Budget}
              onChange={(e) =>
                setnoteBudget({ ...notebuget, Budget: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mt-12 w-auto px-10 mb-12">
            <button
              onClick={handleSaveEntries}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Save All
            </button>
          </div>
        </div>
      </div>
 
   );
};

export default AdminTripGuide;
