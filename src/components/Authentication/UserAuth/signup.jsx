  
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
import google from '../../../assets/image/icon.jpg'
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoogleLogin } from '@react-oauth/google';
import { UserGoogleSignup } from "../../../services/userApi";
import axios from "axios";
import { GuideGoogleSignup } from "../../../services/guideApi";

export function SignUpWithForm({open,handleOpen,selectedOption}) {
 

  const navigate = useNavigate();

  const [other, setOther] = useState({ cpassword: "", check: false });
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });


  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  
  // For google registratin
  const [guser, setgUser] = useState([]);
  console.log(user);
 

  // Validations
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    if (user.username.trim() === "") {
      toast.error("Username should not be empty");
      return false;
    } else if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser((prevUser) => ({ ...prevUser, email: "" }));
      toast.error("Enter a valid Email");
      return false;
    } else if (user.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (user.password.trim().length < 6) {
      toast.warn("Password should be at least 6 characters");
      return false;
    } else if (other.cpassword === "") {
      toast.error("Confirm Password should not be empty");
      return false;
    } else if (user.password !== other.cpassword) {
      toast.error("Password didn't match");
      return false;
    } else if (!other.check) {
      toast.error("Checkbox should be checked");
      return false;
    }
    return true;
  };

  //   After form submition
  const FormHandlerSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      user.email= user.email;
      handleLoading();
      try {
        const response = await axios.post(
          import.meta.env.VITE_BASE_USER_URL + "/account/register/",
          user
        );
        localStorage.setItem('email',user.email)
        console.log(response);
        handleOpen()  
        toast.success(response.data.msg);
        setUser({
          username: "",
          email: "",
          password: "",
          role:"",
        });
        setOther({ cpassword: "", check: false });
        handleLoading();
        navigate('/register-resendmail')
      } catch (error) {
        console.log(error);
        handleLoading();
        handleOpen()
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          if (errorData.email) {
            toast.error(errorData.email[0]);
          }
        } else {
          toast.error("An error occurred during registration.");
        }
      }
    }
     
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setgUser(codeResponse);
      GoogleAuth();
      handleOpen();
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  
  const GoogleAuth = async () => {
    try {
      if (!guser) return;
      handleLoading();
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${guser.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${guser.access_token}`,
            Accept: "application/json",
          },
        }
      );
      let res;
      if (user.role === "user") {
        res = await UserGoogleSignup(response.data);
      } else {
        res = await GuideGoogleSignup(response.data);
      }
      toast.success(res.data.msg);
      setgUser([]);
      const token = JSON.stringify(res.data.token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.data && error.response.data.email) {
        toast.error(error.response.data.email[0]);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };
  
  useEffect(() => {
    // FirstInputRef.current.focus();
    document.title = "SignUp | Travel Tide";
    setUser({...user, role : selectedOption})
  }, [handleOpen]);

  return (
    <>
     
      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          
          
        <div className="mt-12  px-6  place-items-center font-bold text-xl text-dark mx-auto block text-center">

            Sign up to take your trip planning to the next level  
            </div >
            
        <form onSubmit={FormHandlerSignup}>

           <CardBody className="flex flex-col gap-4">
           <ToastContainer />

           <div className="flex items-center bg-white hover:bg-gray-300 rounded-full text-black border border-gray-500 p-2"  onClick={()=>login()}>
           <img className="mr-16" src={google} alt="Google Logo" />
           <p> Sign up with Google</p>
          </div>  


          <hr className="w-18  border-t border-gray-500 mt-4"/>   

          <div className="relative">
              
              <Input label="Username" size="lg" value={user.username} name="username"  type="username" onChange={(e) =>setUser({ ...user, [e.target.name]: e.target.value })
                    } />
              
          </div>
              
            <div className="relative">
              
            <Input label="Email" size="lg" value={user.email} name="email"  type="email"  onChange={(e) =>setUser({ ...user, [e.target.name]: e.target.value })} />
            
            </div>
            <Input label="Password" size="lg" type="password" name="password" value={user.password}onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value }) } />
            <Input label="Confirm Password" size="lg"  type="password" name="cpassword" value={other.cpassword}onChange={(e) => setOther({ ...other, [e.target.name]: e.target.value }) } />

            <div className="-ml-2.5">
              <Checkbox label="Remember Me" type="checkbox" checked={other.check} name="check" onChange={(e) => setOther({ ...other, [e.target.name]: e.target.checked }) } />
            </div>

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Log in
              </Typography>
            </Typography>
          </CardFooter>
          </form>

         </Card>
      </Dialog>
    </>
  );
}
