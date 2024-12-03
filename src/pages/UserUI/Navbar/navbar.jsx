import React, { useEffect, useState } from "react";
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
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import Login from "../../../components/Authentication/UserAuth/login";
import { useNavigate, Link } from "react-router-dom";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import jwt_decode from "jwt-decode";
import userimage from "../../../assets/image/user.png"

// Helper function to check authentication status
const isAuthenticated = () => !!localStorage.getItem("token");

function ProfileMenu({ closeMobileMenu }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwt_decode(token);
      const userId = decode.user_id;

      const fetchUserData = async () => {
        try {
          const response = await userAxiosInstant.get(
            `/account/guide_details/${userId}/`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("User data not found", error);
        }
      };
      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end " className="z-50">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="User Avatar"
            className="border border-gray-900 p-0.5"
            src={userData.profile_image || userimage}
          />
          <ChevronDownIcon
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem
          onClick={() => {
            closeMenu();
            navigate("/user/user-profile/");
            if (closeMobileMenu) closeMobileMenu(); // Close mobile menu if in mobile view
          }}
        >
          <UserCircleIcon className="h-4 w-4 mr-2" />
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          className="flex items-center gap-2 rounded hover:bg-red-500/10"
        >
          <PowerIcon className="h-4 w-4 text-red-500" />
          <Typography as="span" variant="small" className="font-normal text-red-500">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    path: "/user/",
  },
  {
    label: "Travel guides",
    path: "/user/trip-guiding",
  },
  {
    label: "Join a trip",
    path: "/user/trip-join",
  },
  
];

function NavList() {
  return (
    <div className="mb-4 mt-3 flex flex-col gap-2  lg:mt-3 lg:flex-row mr-4  ">
      {navListItems.map((item, index) => (
        <div key={index} className="flex items-center">
          <Typography
            as="a"
            href="#"
            variant=""
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


export function UserComplexNavbar() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 960);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth >= 960);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <Navbar className="mx-auto max-w-full p-6 pl-6 rounded-none z-50">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="text-2xl font-bold text-[#f75940] hover:text-[#e54632] lg:text-3xl transition duration-300 ease-in-out ml-2 lg:ml-24"
        >
          Travel Tide
        </Typography>
        
        {/* Desktop Nav List */}
        <div className="absolute top-2/4 right-6 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        {/* Mobile Menu Icon */}
        {isLoggedIn && (
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden z-50"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        )}

        {/* Profile or Login/Signup Buttons */}
        {isLoggedIn ? (
          isDesktop ? (
            <ProfileMenu />
          ) : null // Hide ProfileMenu in mobile view (it will be shown in MobileNav)
        ) : (
          <div className="ml-auto mr-2 flex items-center gap-4">
            <Login />
            <Button onClick={() => navigate("/user_role")} className="bg-[#f75940] rounded-full text-white py-2 px-4">
              Sign up
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation - Only visible if logged in */}
      {isLoggedIn && (
        <MobileNav open={isNavOpen} className="overflow-scroll z-40">
          <NavList />
          {/* Add ProfileMenu to MobileNav for easy access */}
          {!isDesktop && (
            <div className="mt-4">
              <ProfileMenu closeMobileMenu={() => setIsNavOpen(false)} />
            </div>
          )}
        </MobileNav>
      )}
    </Navbar>
  );
}
