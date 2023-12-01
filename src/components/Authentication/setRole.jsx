import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { SignUpWithForm } from "./UserAuth/signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserComplexNavbar } from "../../pages/UserUI/Navbar/navbar";
 
function UserRole() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Choose somthing';
  }, []);
  const [selectedOption, setSelectedOption] = useState(''); // 'client' or 'freelancer'
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const RoleSelection = () =>{
    if (selectedOption === ''){
        toast.error('Choose anythink')
    } else{
        handleOpen()
    }
  }
  return (
   <>
    <UserComplexNavbar/>
 
    <ToastContainer />
    <div className="h-screen flex flex-col items-start">
       <div className=" bg-white rounded-2xl sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 sm:border border-dark-800 mx-auto mt-16 grid grid-row-2 gap-2">
        <div>
          <p className="text-2xl font-bold text-center m-8">Join as a User or Guide</p>
        </div>
          <div className="grid sm:grid-cols-2 grid-cols-none gap-5">
            <div
              className={`border rounded-xl mx-3 sm:ms-16 grid grid-row-2 ${
                selectedOption === 'user' ? 'border-dark-500 bg-gray-200' : ''
              }`}
              onClick={() => handleOptionChange('user')}
            >
              <div className="grid grid-cols-2">
                <div>
                  <img   alt="" className="h-8 lg:h-16 m-2" />
                </div>
                <div className="flex justify-end items-start mx-3 my-3">
                  <input type="radio" checked={selectedOption === 'user'} />
                </div>
              </div>
              <div>
                <p className="font-medium m-3">I’m a user, join a trip </p>
              </div>
            </div>
            <div
              className={`sm:me-16 border mx-3 sm:mx-0 rounded-xl grid grid-row-2 ${
                selectedOption === 'guide' ? 'border-dark-500 bg-gray-200' : ''
              }`}
              onClick={() => handleOptionChange('guide')}
            >
              <div className="grid grid-cols-2">
                <div>
                  <img  alt="" className="h-6 lg:h-16 m-2" />
                </div>
                <div className="flex justify-end items-start mx-3 my-3">
                  <input type="radio" checked={selectedOption === 'guide'} />
                </div>
              </div>
              <div>
                <p className="font-medium m-3">I’m a Guide, looking for Guide a Trip </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="butt w-60 p-2 mt-8  text-white rounded-3xl font-semibold bg-[#f75940]" 
            onClick={RoleSelection}>
               Sign up
             </button>
          </div>
        <div className="flex justify-center mt-5 mb-8">
          <p className="text-sm p-1">Already have an account? <Link className="text-[#f75940] ps-1 text-sm" to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
    <SignUpWithForm open={open} handleOpen={handleOpen} selectedOption={selectedOption}/>
   </>
  );
}

export default UserRole;
