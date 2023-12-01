import { GuideAxiosInstant } from "../utils/axiosUtils";

const GuideGoogleSignup = (value) => {
  const values = {
    email: value.email,
    username: value.email,
    password: value.id,
  };
<<<<<<< HEAD
  return GuideAxiosInstant.post("guide/googleregistration/", values, {
=======
  return GuideAxiosInstant.post("account/googleregistration/", values, {
>>>>>>> origin/main
    withCredentials: true,
  });
};



export {
    GuideGoogleSignup  
  };
  