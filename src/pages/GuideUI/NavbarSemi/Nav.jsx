
import React ,{useState} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
   
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'; 
 

// nav list component
const navListItems = [
    {
      label: "Home",
      path: "/guide/",

     },
    {
      label: "Travel Guide",
     },
  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400 absolute right-2 top-2" // Position the icon using absolute positioning
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => {
        // Handle the search icon click event here
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6M9 2a7 7 0 110 14 7 7 0 010-14z"
      />
    </svg>
  ];
  

  
function NavList() {
    return (
      <div className="mb-4 mt-3 flex flex-col gap-2  lg:mt-3 lg:flex-row mr-4 ">
        {navListItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-bold"
            >
  
              <MenuItem className="flex gap-2 lg:rounded-full">
              <Link to={item.path}> {item.label} </Link>
              </MenuItem>
            </Typography>
           

          </div>
        ))}
      </div>
    );
  }
  
export default NavList;

export function ComplexNavbar({}) {
     const [isNavOpen, setIsNavOpen] = React.useState(false);
   
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
   
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setIsNavOpen(false),
      );
      
    }, []);
  
   
  
  
    return (
      <Navbar className="mx-auto  w-7/12 p-3 pl-6 rounded-none  z-50" style={{ position:"fixed"}}>
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="text-2xl font-bold  text-[#f75940] hover:text-[#e54632] lg:text-3xl transition duration-300 ease-in-out  lg:ml-10 "
          
          >
            Travel Tide
          </Typography>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </Navbar>
    );
  }