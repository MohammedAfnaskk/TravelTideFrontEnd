import React, { useState, useEffect } from 'react'
import MapComponent from "./googleMap";
import { ComplexNavbar } from "../NavbarSemi/Nav";
import placeImage from '../../assets/image/adminbg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';


import {
    Card,
    CardBody,
    CardFooter,
    Textarea ,
    Input,
    Typography,
    
  } from "@material-tailwind/react";
   
  export function SimpleCard() {
    return (
      <Card className="w-full">
        <CardBody>
          <Typography  color="blue-gray" className="mb-20 font-bold text-2xl">
            Place Name
          </Typography>
          <Typography className='text-sm'>
            Date: September 27, 2023

          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {/* Add any footer content here */}
        </CardFooter>
      </Card>
    );
  }
  
 
  const TripPlanningTable = () => {

    const handleSaveEntries = () => {
        // Implement your logic to save all entries here
        // You can access all entries in the 'entries' state array
        // For example, you can send them to an API or store them in a database
        console.log('Entries saved:', entries);
      };
    
 
    
    const [entries, setEntries] = useState([
      {
        place: '',
        description: '',
        image: null, // You can store the selected image here
        date: '',
      },
    ]);

    const [budget, setBudget] = useState(''); // State to store the budget value

  
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
  
    return (
    <div>
        
      <ComplexNavbar />

      {/* Add more content */}
      <div className="relative overflow-y-auto">
        <img
          className="w-full lg:h-64 object-cover relative z-10"
          src={placeImage}
          alt="nature image"
        />
        <div className="absolute top-32 lg:ml-32  h-44 ml-16    w-8/12  flex justify-items-center z-20">
          <SimpleCard />
        </div>
        
        <div className=" px-10 mt-16">
            
    

              <p className="mb-2 font-bold">Note</p>
              <Textarea
                size="md"
                label="Note"
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
          onChange={(e) => setBudget(e.target.value)}
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
  
   
   
  

const HomePage = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

  return (
    <div className="flex">
      <div className=" lg:w-7/12">
         <TripPlanningTable />
      </div>
      <div className="fixed top-0 right-0  lg:w-5/12">
      {screenWidth >= 750 ? (
        <MapComponent />
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
