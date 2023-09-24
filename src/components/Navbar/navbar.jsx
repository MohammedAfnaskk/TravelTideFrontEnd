import React ,{useState} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import  Login from "../Authentication/UserAuth/login";
import { SignUpWithForm } from "../Authentication/UserAuth/signup";
import { useNavigate } from "react-router-dom";
  

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 

 

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem("token");
    // Set isLoggedIn to false
    isAuthenticated();
    
    window.location.reload();

  };
  
  
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                onClick={() => {
                   handleLogout();
                }}
                clas
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

 
 
// nav list component
const navListItems = [
  {
    label: "Home",
   },
  {
    label: "Travel guides",
   },
  {
    label: "Plan a trip",
   },
   {
    
  search: <div className="ml-24">
  <Input
    type="search"
    label="Type here..."
     containerProps={{
      className: "min-w-auto",
    }}
  />
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
  </div> 
  },
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
              {item.label}
            </MenuItem>
          </Typography>
          {item.search && (
            <div className="relative">
              {item.search}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default NavList;

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token){
    return true
  }
  else{
    return false

  }
   
};

 
export function ComplexNavbar({}) {
  const navigate = useNavigate()
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
    
  }, []);

 


  return (
    <Navbar className="mx-auto max-w-full p-3 pl-6 rounded-none">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="text-2xl font-bold  text-[#f75940] hover:text-[#e54632] lg:text-3xl transition duration-300 ease-in-out ml-2 lg:ml-24 "
        
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

        {isAuthenticated()? (
          <ProfileMenu/>

        ) : (
          <div className="ml-auto mr-2 ">
          <Login />
          <Button
          onClick={()=>navigate('/user_role')}
            className="bg-[#f75940] rounded-full text-white py-2 px-4">
            Sign up
          </Button>
          </div>
        )}
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}