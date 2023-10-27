import React from "react";
import ProfileGuideDetails from './guideDetails';

  const ProfileMapComponent = () => {
    const latitude = 20.5937; 
    const longitude = 78.9629; 

  return (
    <>
    <div className="lg:flex flex-row lg:mx-40 gap-6">
    <ProfileGuideDetails />
     
    <div className="relative lg:w-full mx-5  rounded-lg overflow-clip mt-10 h-80 ">
    <embed
      title="Google Maps"
      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.535207889163!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCenter%20of%20the%20World!5e0!3m2!1sen!2sus!4v1631860405374!5m2!1sen!2sus`}
      width="100%"
      height="708" // Adjust the height as needed
      aria-hidden="false"
      
     ></embed>
     </div>
     
     </div>

     
      </>
  );
};

export default ProfileMapComponent