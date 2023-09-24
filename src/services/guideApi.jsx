import { GuideAxiosInstant } from "../utils/axiosUtils";

const GuideGoogleSignup = (value) => {
  const values = {
    email: value.email,
    username: value.email,
    password: value.id,
  };
  return GuideAxiosInstant.post("account/googleregistration/", values, {
    withCredentials: true,
  });
};



export {
    GuideGoogleSignup  
  };
  