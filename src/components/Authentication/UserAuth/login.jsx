 
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import { UserGoogleSignin, userSignin } from "../../../services/userApi";
import { useGoogleLogin } from "@react-oauth/google";
import google from '../../../assets/image/icon.jpg'

import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
  
const Login=({}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  



  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
      
    // Get the value of the 'message' parameter from the URL
    const message = searchParams.get('message');

    if (message) {
      handleOpen()
      console.log(message);
    }
  },[])

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

 // Validations
  const Validation = () => {
    if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: "" });
      emailInputRef.current.focus();
      toast.warn("Enter a valid email");
      return false;
    } else if (user.password.trim() === "") {
      passInputRef.current.focus();
      toast.error("Password should not be empty");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {  
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  };

  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    if (Validation()) {
      try {
        const res = await userSignin(user);
        if (res.status === 200) {
          const token = JSON.stringify(res.data); 
          const decoded = jwtDecode(token);
          if (decoded.role === "user") {
            localStorage.setItem("token", token);
            navigate("/user/");
            handleOpen()
            
          } 
          else if (decoded.role === "guide") {
            localStorage.setItem("token", token);
            navigate("/guide/");
            handleOpen()
          } else {
            toast.error("Invalid role");
          }
        } else {
          console.log(res.status);
          toast.error("Invalid login credentials or verify your email");
        }
      } catch (error) {
<<<<<<< HEAD
        console.log(error.response);
=======
>>>>>>> origin/main
        console.error("An error occurred during login:", error);
        toast.error("An error occurred during login. Please try again later.");
      }
    }
  };

<<<<<<< HEAD




  // For google registration
  const [guser, setgUser] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse);
     },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(()=>{ 

=======
  // For google registration
  const [guser, setgUser] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse);
      GoogleAuth();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
>>>>>>> origin/main
  const GoogleAuth = async () => {
   
    try {
      if (!guser) return;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${guser.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const res = await UserGoogleSignin(response.data);
      const token = JSON.stringify(res.data);
      const decoded = jwtDecode(token);
      if (decoded.role === "user") {
        localStorage.setItem("token", token);
        navigate("/user/");
      } else if (decoded.role === "guide") {
        localStorage.setItem("token", token);
        navigate("/guide/");
      }
      setgUser([]);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("An error occurred during signup.");
      }
    }  
  };

<<<<<<< HEAD
  if (guser){
    GoogleAuth();
  }

  }, [guser])


=======
>>>>>>> origin/main
return (
    <>

      <Button
     className="mr-2 bg-white text-dark rounded-full  py-2 px-4 "
      onClick={handleOpen}
      >
        Log in
      </Button>
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
            <ToastContainer />

        <Card className="mx-auto w-full max-w-[24rem]">
          
        <div className="mt-12  px-6  place-items-center font-bold text-xl text-dark mx-auto block text-center">

        Log in to Trevel Tide
        </div >
          <form onSubmit={FormHandlerLogin}>

           <CardBody className="flex flex-col gap-4" >
           <div className="flex items-center bg-white hover:bg-gray-300 rounded-full text-black border border-gray-500 p-2" onClick={()=>login()}>
           <img className="mr-16" src={google} alt="Google Logo" />
           <p> Sign in with Google</p>
          </div>

          <hr className="w-18  border-t border-gray-500 mt-4"/>   

            <div className="relative">
              
            <Input label="Email" size="lg" type="email" name="email"  value={user.email} id="email" onChange={(e) =>setUser({ ...user, [e.target.name]: e.target.value })} required/>
            
            </div>
            <Input label="Password" size="lg" type="password" name="password"   id="password" onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })} required/>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient"  type='submit' fullWidth>
              Log in
            </Button>
            
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
               >
                Sign Up
              </Typography>
            </Typography>
          </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
    
  );
}
 

export default  Login
