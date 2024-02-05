import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../../../assets/image/adminbg.jpg";
import jwtDecode from "jwt-decode";
import adminApi from "../../../services/adminApi";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../LoadingAnimation/Loading";
import "react-toastify/dist/ReactToastify.css";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function AdminLogin() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({ email: "", password: "" });

 
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
  }

  useEffect(() => {
    document.title = "Login | Travel Tide";
  }, []);
  // After form submition
  const FormHandlerLogin = async (e) => {
    e.preventDefault();
    handleLoading();
    if (Validation()) {
      try {
        const res = await adminApi.AdminSignin(user);

        if (res.status === 200) {
          const token = JSON.stringify(res.data);
          const decoded = jwtDecode(token);
 
          if (decoded.role === "admin" && decoded.is_admin) {
            localStorage.setItem("token", token);
            toast.success("Login successful");
            navigate("/admin/dashbord");
          } else {
            toast.error("Invalid role");
          }
        } else {
          toast.error("Invalid login credentials");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login");
      }
    }
    handleLoading();

  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div
        className="bg-cover bg-center h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="h-screen flex flex-col ">
          <div className=" bg-gray-100 rounded-2xl  sm:border border-dark-800 mx-auto mt-16 ">
            <Card color="transparent">
              <Typography
                variant="h4"
                color="blue-gray"
                className="text-center mt-6"
              >
                Admin SignIn
              </Typography>

              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
                onSubmit={FormHandlerLogin}
              >
                <div className="mb-4 flex flex-col mx-5 gap-6">
                  <Input
                    label="Email"
                    size="lg"
                    type="email"
                    name="email"
                    value={user.email}
                    id="email"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Password"
                    size="lg"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) =>
                      setUser({ ...user, [e.target.name]: e.target.value })
                    }
                    required
                  />
                </div>
                <Checkbox
                  className="mx-5"
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900 "
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <div className="mb-4 flex flex-col mx-5 gap-6">
                  <Button className="mt-6   " type="submit">
                    Sign In
                  </Button>
                </div>
                <Typography
                  color="gray"
                  className="mt-8 text-center font-normal"
                >
                  <a href="#" className="font-medium text-gray-900"></a>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
