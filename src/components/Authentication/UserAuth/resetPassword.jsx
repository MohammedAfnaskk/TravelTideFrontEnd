import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../../services/userApi";
import Loading from "../../LoadingAnimation/Loading";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const location = useLocation();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const gettoken = searchParams.get("key");

    if (gettoken) {
      setToken(gettoken);
    }
  }, [location.search]);


  //  For loading
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
 
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (Validation()) {
      handleLoading();

      try {
        console.log("Token value:", token);
        const res = await resetPassword(token, { password: user.password });

        if (res.status === 200) {
          toast.success("Password reset successful!");
          navigate("/");
        } else {
          toast.error("Failed to reset the password");
        }
        handleLoading();

      } catch (error) {
        handleLoading();

        console.error("An error occurred during password reset:", error);
        toast.error(
          "An error occurred during password reset. Please try again later."
        );
      }
    }
  };

  // Validations
  const Validation = () => {
    if (user.password.trim() === "") {
      toast.error("Password should not be empty");
      return false;
    } else if (user.confirmPassword.trim() === "") {
      toast.error("Confirm Password should not be empty");
      return false;
    } else if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setUser({ ...user, password: "", confirmPassword: "" });
      return false;
    }
    return true;
  };
  return (
    <>
      <Card className="mt-28 mx-auto w-full max-w-[24rem] bg-gray-100 ">
        <Typography
          as="a"
          href="#"
          className="text-2xl font-bold mt-2 text-[#f75940] hover:text-[#e54632] lg:text-3xl transition duration-300 ease-in-out text-center"
        >
          Travel Tide
        </Typography>
        <div className="mt-4 px-6 place-items-center font-bold text-xl text-black mx-auto block text-center">
          Reset Password
        </div>
        <form onSubmit={handleResetPassword}>
          <CardBody className="flex flex-col gap-4">
            <div className="relative">
              <Input
                label="Password"
                size="lg"
                type="password"
                name="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
                required
              />
            </div>
            <div className="relative">
              <Input
                label="Confirm Password"
                size="lg"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, [e.target.name]: e.target.value })
                }
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
              <Link to="/" className="text-[#f75940] font-bold ml-1">
                Log in
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default ResetPassword;
