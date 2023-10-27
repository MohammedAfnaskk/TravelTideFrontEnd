import React, { useState, useEffect } from 'react';
import EditProfile from "./editProfile";
import { GuideAxiosInstant } from "../../utils/axiosUtils";
import jwt_decode from 'jwt-decode'
import PRimage from '../../assets/image/user.png'

const ProfileGuideDetails = () => {
  const [guide, setGuide] = useState([]);
  const [childTriggered, setChildTriggered]  = useState(false)

  const handleChildTrigger = () =>{ setChildTriggered((cur)=> !cur)}

   useEffect(() => {
    const token = localStorage.getItem('token')
    const decode = jwt_decode(token);
    const guideId = decode.user_id;
 
    GuideAxiosInstant
    .get(`/account/guide_details/${guideId}`)
       .then((response) => {
        setGuide(response.data);
      })
      .catch((error) => {
        console.error('Error fetching guide details', error);
      });
  }, [childTriggered]);

  let ProfileImage
  if (guide.profile_image) {
    ProfileImage = guide.profile_image;
  } else {
    ProfileImage = PRimage;
  }

  return (
    <section className="w-80 mt-10 mx-auto bg-[#ffffff] rounded-2xl px-8 py-6 border border-gray-300">
      <div className="flex items-center justify-between"></div>
      <div className="w-fit mx-auto">
        
        <img
          src={ProfileImage}
          className="rounded-full w-48 h-48"
          alt="profile picture"
        />

      </div>
      <div className="mt-2">
        <h2 className="text-balck font-bold text-lg  tracking-wide text-center">
          {guide.username}
        </h2>
      </div>
      <p className="text-emerald-400 font-semibold mt-4">Details</p>

      <div className="mt-2 text-white text-sm">
        <span className="text-black font-semibold">
          Email:{guide.email}
        </span>
      </div>
      <div className="mt-2 text-white text-sm">
        <span className="text-black font-semibold gap-10">
          Address:{guide.address}
        </span>
      </div>
      <div className="mt-2 text-white text-sm">
        <span className="text-black font-semibold">Mobile:{guide.phone}</span>
      </div>
      <div className="mt-4">
      <EditProfile guide={guide} childClick={handleChildTrigger}/>
      </div>
    </section>
  );
};

export default ProfileGuideDetails;
