import React, { useState,useEffect } from "react";
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
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import Login from "../../../components/Authentication/UserAuth/login";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import userimage from "../../../assets/image/user.png"
 
function ProfileMenu() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const userId = decode.user_id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userAxiosInstant.get(
          `/account/guide_details/${userId}/`
        );
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("User data not found", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    isAuthenticated();
    navigate('/user')
    window.location.reload();
  };

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: "/guide/guide-profile/",
    },
 
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];

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
            src={
              userData
                ? userData.profile_image
                :userimage
             }
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
        {profileMenuItems.map(({ label, icon, path, onClick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                closeMenu();
                if (path) {
                  // You can use either Link or navigate based on whether the item has a path
                  navigate(path);
                } else if (onClick) {
                  onClick();
                }
              }}
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
    path: "/guide/",
  },
  {
    label: "Travel guides",
    path: "/guide/trip-guiding",
  },
  
];

function NavList() {
  return (
    <div className="mb-4 mt-3 flex flex-col gap-2 lg:mt-3 lg:flex-row mr-4 ">
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
          {item.search && <div className="relative">{item.search}</div>}
        </div>
      ))}
    </div>
  );
}

export default NavList;

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

export function ComplexNavbar({}) {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-full  p-6 pl-6 rounded-none   ">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="text-2xl font-bold  text-[#f75940] hover:text-[#e54632] lg:text-3xl transition duration-300 ease-in-out ml-2 lg:ml-24 "
          >
            Travel Tide
          </Typography>
        <div className="absolute top-2/4   right-6 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
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

        {isAuthenticated() ? (
          <ProfileMenu />
        ) : (
          <div className="ml-auto mr-2 ">
            <Login />
            <Button
              onClick={() => navigate("/user_role")}
              className="bg-[#f75940] rounded-full text-white py-2 px-4"
            >
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
