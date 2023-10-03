import React, { useState, useRef } from "react";
import placeImage from '../../../assets/image/adminbg.jpg';
 
function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleEditClick = () => {
    // Trigger the file input when the edit icon is clicked
    fileInputRef.current.click();
  };

  return (
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
        src={selectedFile ? URL.createObjectURL(selectedFile) : placeImage}
        alt="nature image"
        onClick={handleEditClick}

       />
    </div>
  );
}

export default ImageUpload;
