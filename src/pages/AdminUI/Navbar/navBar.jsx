import React, { useState, useEffect } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import adminApi from "../../../services/adminApi";
import UserManage from "../Dashboard/userManage";

function AdminNavbar() {
 

   // For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  

  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className=" from-black to-black mx-auto max-w-full rounded-none ml-auto"
    >
      <div className="flex  items-center justify-between  text-white">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-6 ml-3 cursor-pointer py-1.5"
        >
          Admin Dashboard
        </Typography>
        
       
      </div>
    </Navbar>
  );
}

export default AdminNavbar;
