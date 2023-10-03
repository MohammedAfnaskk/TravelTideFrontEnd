import { userAxiosInstant } from "../utils/axiosUtils";

//------------------------------ POST METHODS-------------------------------------------

// User Signin
const userSignin = (values) => {
  return userAxiosInstant
    .post("account/token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;  
    });
};

// User Token refresh
const TokenRefresh = (value) => {
    return userAxiosInstant.post("account/token/refresh/", value, {
      withCredentials: true,
    })
    .catch((error) => error.response);  
  };
  

// User Google signup
const UserGoogleSignup = (value) => {
    const values = {
      username: value.email,
      email: value.email,
      password: value.id,
    };
    return userAxiosInstant.post("account/googleregistration/", values, {
      withCredentials: true})
      .catch((error) => {
        throw error; 
      });   
  };
  
  // User Google signin
  const UserGoogleSignin = (value) => {
    const values = {
      email: value.email,
      password: value.id,
    };
    return userAxiosInstant.post("account/token/", values, { withCredentials: true });
  };
  

  // Create TripPlan
  const TripPlanning = (value) => {
  return userAxiosInstant.post("travel_tide/trip-planning/", value, {
    withCredentials: true,
  });
  };

 

export {
  userSignin,
  UserGoogleSignup,
  UserGoogleSignin,
  TokenRefresh,
  TripPlanning,     

};
