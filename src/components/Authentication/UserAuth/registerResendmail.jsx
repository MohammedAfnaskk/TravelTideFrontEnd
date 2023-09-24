import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserUrl } from "../../../constants/constants";
import axios from "axios";
import emailvr from '../../../assets/image/emailvr.png'
function RegisterResendmail() {
  const navigate = useNavigate();
  const [Email,setEmail] = useState({email:''})
  // Loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  useEffect(() => {
     setEmail({...Email,email:localStorage.getItem('email')})
  }, []);

  const Gmail = () => {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  };
 
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="text-center">
      <div className="flex justify-center">  
      <img src={emailvr} alt="Email Verification" className="w-56  mb-4" />
    </div>    
        <h1 className="font-semibold text-2xl text-dark-600">
          Verify Your Email to Continue
        </h1>
        <p className="text-dark-600 md mt-2">
          Please check your email and click the link provided to verify your address.
        </p>
      </div>
      <button
        onClick={Gmail}
        className="mt-4 text-white bg-[#f75940] px-6 py-2 rounded-full font-bold hover:bg-[#e54632] transition duration-300"
      >
        Go to Gmail Inbox
      </button>
    </div>
  );
}


export default RegisterResendmail;