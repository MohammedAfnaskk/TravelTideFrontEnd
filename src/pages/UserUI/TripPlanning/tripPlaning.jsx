import React, { useState, useRef ,useEffect } from 'react'
import { ComplexNavbar } from "../../NavbarSemi/Nav";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Textarea ,Input} from "@material-tailwind/react";
import  PlaceCard  from '../../UserUI/TripPlanning/PlaceCard';
 import placeImage from '../../../assets/image/adminbg.jpg';
 
 import { useDispatch, useSelector } from 'react-redux';
 import { TripPlanning } from '../../../services/userApi';


const TripPlanningTable = () => {
 
   
    
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
         note:'',
         budget:'',
         place_image:null,
    });
    
    const imageUrl = notebuget.place_image ? URL.createObjectURL(notebuget.place_image) : placeImage;

    const { note , budget } = notebuget;
 
    console.log('note and budget',notebuget)


    
    const [entries, setEntries] = useState([
    {
      place: '',
      description: '',
      image: null, // You can store the selected image here
      date: '',
    },
  ]);

    console.log('tripPlannig',entries)

    const handleAddEntry = () => {
      const newEntry = {
        place: '',
        description: '',
        image: null,
        date: '',
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
      const updatedEntries = [...entries];
      updatedEntries[index].image = event.target.files[0]; // Assuming you want to store the first selected image
      setEntries(updatedEntries);
    };
  
    
      const  mainPlace = useSelector((state) => state.user.MainPlace);
      const MainPlace = {
        ...mainPlace,
        ...notebuget,
      }
   
      console.log('afnas',MainPlace);
      const handleSaveEntries = async () => {
 
      try {
        // Send mainPlace and tripPlanningData to the backend
        const response = await TripPlanning({MainPlace});
        // Handle success or errors based on the response from the backend
        console.log("responsse", response)
      } catch (error) {
        // Handle API request errors
        console.log("res",error)
      }
    };

 

    return (
    <div>
        
      <ComplexNavbar />

      {/* Add more content */}
      <div className="relative overflow-y-auto">
       {/* main_place image  */}

      <div className="relative">
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      
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
            value={note}
            onChange={(e) => setnoteBudget({...notebuget,note:e.target.value})}
            />
        </div>

         <hr className="w-18 border-t border-gray-500 mt-10 " />

        {entries.map((entry, index) => (
          <div key={index} className="mt-10">
            
            <div className="mb-8   inline-flex  ml-10">
           <button onClick={() => handleDeleteEntry(index)} className="bg-blue-gray-300 text-dark font-bold py-2 px-4 rounded">
            <FontAwesomeIcon icon={faTrash} /> {/* Use the delete icon here */}
             </button>
            </div> 
            <div className="  px-10">
              <p className="mb-2 font-bold">Place</p>
              <Input
                size="lg"
                label="Place"
                value={entry.place}
                onChange={(e) => handleInputChange(e, index, 'place')}
              />
            </div>
  
            <div className="  px-10 mt-4">
              <p className="mb-2 font-bold">Description</p>
              <Textarea
                size="md"
                label="Description"
                value={entry.description}
                onChange={(e) => handleInputChange(e, index, 'description')}
              />
            </div>
  
            <div className="w-96 px-10 mt-4">
              <label htmlFor={`imageInput-${index}`} className="block text-gray-700 text-sm font-bold">
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
                onChange={(e) => handleInputChange(e, index, 'date')}
              />
            </div>

         {/* Add another form */}
        <div className="mt-10   px-10">
        <button onClick={handleAddEntry} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
          value={budget}
          onChange={(e) => setnoteBudget({...notebuget,budget:e.target.value})}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mt-12 w-auto px-10 mb-12">
        <button onClick={handleSaveEntries} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Save All
        </button>
      </div>
    
    </div>
      </div>
 
    );
  };

export default TripPlanningTable
   
   
  


