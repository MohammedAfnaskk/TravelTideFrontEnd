
import React from "react";



  const MapComponent = () => {
    const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 20, 
      };
    
  return (
    
    <iframe
      title="Google Maps"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.535207889163!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCenter%20of%20the%20World!5e0!3m2!1sen!2sus!4v1631860405374!5m2!1sen!2sus"
      width="100%"
      height="655" // Adjust the height as needed
      frameBorder="5"
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
    ></iframe>
  );
};

export default MapComponent