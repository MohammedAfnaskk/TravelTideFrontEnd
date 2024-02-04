import React, { useState, useRef, useEffect } from "react";
import { ComplexNavbar as UserNavbar } from "../NavbarSemi/Nav";
import { ComplexNavbar as GuideNavbar } from "../../GuideUI/NavbarSemi/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Textarea, Input } from "@material-tailwind/react";
import PlaceCard from "./PlaceCard";
import placeImage from "../../../assets/image/adminbg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import {
  EditTripPlanning,
  EditPlanningData,
  TripPlanningData,
} from "../../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import { useSelector } from "react-redux";
import Loading from "../../../components/LoadingAnimation/Loading";

const EditTripPlanningTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state && location.state.id;
  const [currenttripDetails, setCurrentTripDetails] = useState(null);

  const [main_place, setMainPlace] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const mainPlaceData = useSelector((state) => state.user.MainPlace);

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
    userAxiosInstant
      .get(`/travel_manager/MainPlaceViewSetsingleView/${id}`)
      .then((response) => {
        console.log("Response Data:--->>", response.data);
        setCurrentTripDetails(response.data);
      })
      .catch(() => {
        console.error("Error fetching trip details:", error);
      });
  }, [id]);

  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const role = decode.role;
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      toast.error("Please select a valid image for the Main Place");
      return;
    }

    setnoteBudget({
      ...notebuget,
      place_image: selectedImage,
    });
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const [notebuget, setnoteBudget] = useState({
    Note: currenttripDetails ? currenttripDetails.note : "",
    Budget: currenttripDetails ? currenttripDetails.budget : "",
    place_image: null,
  });

  const { Note, Budget } = notebuget;

  useEffect(() => {
    setnoteBudget({
      Note: currenttripDetails ? currenttripDetails.note : "",
      Budget: currenttripDetails ? currenttripDetails.budget : "",
      place_image: null,
    });
  }, [currenttripDetails]);

  const [entries, setEntries] = useState([]);
  useEffect(() => {
    if (currenttripDetails && currenttripDetails.trip_planning) {
      setEntries(
        currenttripDetails.trip_planning.map((entry) => ({
          id: entry.id || "",
          place: entry.place || "",
          description: entry.description || "",
          image: null,
          date: entry.date || "",
        }))
      );
    } else {
      setEntries([
        {
          id: "",
          place: "",
          description: "",
          image: null,
          date: "",
        },
      ]);
    }
  }, [currenttripDetails]);

  const handleEntryChange = (index, field, value) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry, i) =>
        i === index ? { ...entry, [field]: value } : entry
      )
    );
  };

  console.log("entries:", entries);

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
    updatedEntries[index].image = event.target.files[0];
    setEntries(updatedEntries);
  };

  useEffect(() => {
    if (mainPlaceData) {
      setMainPlace(mainPlaceData.main_place || "");
      setStartDate(
        mainPlaceData.start_date
          ? new Date(mainPlaceData.start_date).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        mainPlaceData.end_date
          ? new Date(mainPlaceData.end_date).toISOString().split("T")[0]
          : ""
      );
    } else if (currenttripDetails) {
      setMainPlace(currenttripDetails.main_place || "");
      setStartDate(
        currenttripDetails.start_date
          ? new Date(currenttripDetails.start_date).toISOString().split("T")[0]
          : ""
      );
      setEndDate(
        currenttripDetails.end_date
          ? new Date(currenttripDetails.end_date).toISOString().split("T")[0]
          : ""
      );
    }
  }, [currenttripDetails, mainPlaceData]);

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

    if (notebuget.place_image) {
      formData.append("place_image", notebuget.place_image);
    }
    //-------------------------validation----------------------//
    // if (notebuget.place_image === null) {
    //   toast.error("Main Place image is required");
    //   return;
    // }

    if (Note.trim() === "") {
      toast.error("Note field is required");
      return;
    }

    const invalidEntries = entries.some((entry) => {
      return (
        entry.place.trim() === "" ||
        entry.description.trim() === "" ||
        // entry.image === null ||
        entry.date.trim() === ""
      );
    });

    if (invalidEntries) {
      toast.error(
        "Please fill in all entry fields (Place, Description, Image, Date)"
      );
      return;
    }

    handleLoading();

    try {
      const response = await EditTripPlanning(id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response", response);

      if (response.status === 200) {
        const formDataArray = entries.map((entry) => {
          const entryFormData = new FormData();

          if (entry.id) {
            // Existing entry, append ID for update
            entryFormData.append("id", entry.id);
          } else {
            entryFormData.append("maintable_id", response.data.id);
          }

          entryFormData.append("place", entry.place);
          entryFormData.append("description", entry.description);
          entryFormData.append("date", entry.date);

          if (entry.image) {
            entryFormData.append("image", entry.image);
          }

          return entryFormData;
        });

        for (const entryFormData of formDataArray) {
          const entryId = entryFormData.get("id");

          if (entryId) {
            // Existing entry, make a PUT/PATCH request
            const entryResponse = await EditPlanningData(
              entryId,
              entryFormData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            console.log("Response:", entryResponse);
          } else {
            const newEntryResponse = await TripPlanningData(entryFormData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            console.log("New Entry Response:", newEntryResponse);
          }
        }
      }
      handleLoading();
      toast.success("Update success");
    } catch (error) {
      handleLoading();
      console.log("response trip data", error);
      toast.error("Error while saving entries");
    }
  };
  return (
    <div>
      {role === "guide" ? <GuideNavbar /> : <UserNavbar />}

      {loading && <Loading />}

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
            className="w-full lg:h-72 object-cover relative z-10 cursor-pointer"
            src={imageUrl}
            alt="nature image"
            onClick={handleEditClick}
          />
        </div>

        <div className="absolute top-32 lg:ml-32  h-44 ml-16    w-8/12  flex justify-items-center z-20">
          <PlaceCard props={currenttripDetails} />
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
            {index !== 0 && (
              <div className="mb-8   inline-flex  ml-10">
                <button
                  onClick={() => handleDeleteEntry(index)}
                  className="bg-blue-gray-300 text-dark font-bold py-2 px-4 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} />{" "}
                  {/* Use the delete icon here */}
                </button>
              </div>
            )}

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
                onChange={(e) =>
                  handleEntryChange(index, "date", e.target.value)
                }
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTripPlanningTable;
