import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { forgotPassword } from "../../../services/userApi";
import { ComplexNavbar } from "../../Navbar/navbar";
import Loading from "../../LoadingAnimation/Loading";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const ForgotPassword = () => {
   const [user, setUser] = useState({ email: "" });

  // Validations
  const Validation = () => {
    if (user.email.trim() === "") {
      toast.error("Email should not be empty");
      return false;
    } else if (!isValidEmail(user.email.trim())) {
      setUser({ email: "" });
      toast.warn("Enter a valid email");
      return false;
    }
    return true;
  };

  function isValidEmail(email) {
    const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return Regex.test(email);
  }

  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (Validation()) {
      handleLoading();
      try {
        const res = await forgotPassword(user);

        if (res.status === 200) {
          toast.success("Password reset email sent successfully!");
         } else {
          toast.error("Failed to send reset password email");
        }
        handleLoading();

      } catch (error) {
        handleLoading();
        console.error("An error occurred during password reset:", error);
        toast.error("An error occurred during password reset. Please try again later.");
      }
    }
  };



  return (
    <>
    <ComplexNavbar/>
    <Card className=" mt-28 mx-auto w-full max-w-[24rem] ">

      <div className="mt-12 px-6 place-items-center font-bold text-xl text-dark mx-auto block text-center">
        Forgot Password
      </div>
      <form onSubmit={handleResetPassword}>
        <CardBody className="flex flex-col gap-4">
          <div className="relative">
            <Input
              label="Email"
              size="lg"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
              required
            />
          </div>
          {loading && <Loading />}

        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            Reset Password
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Remember your password?{" "}
            <Link to="/" className="text-blue-500 font-bold ml-1">
              Log in
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
    </>
  );
};

export default ForgotPassword;
