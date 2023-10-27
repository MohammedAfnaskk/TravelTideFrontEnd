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
    console.log('Data being sent to the backend:', value);
    return userAxiosInstant.post("travel_manager/main-place/",value, {
    withCredentials: true,
  });
  };


  const TripPlanningData = (value) => {
    console.log('Data being sent to the backend:', value);
    return userAxiosInstant.post("travel_manager/trip-planning/",value, {
    withCredentials: true,
  });
  };

  const InviteFriends = (value) => {
    console.log('Data being sent to the backend:', value);
    return userAxiosInstant.post("travel_manager/invite-friends/",value, {
    withCredentials: true,
  });
  };


  const Payment = (value) => {
    console.log('Data being sent to the backend:', value);
    return userAxiosInstant.post("payments/",value, {
    withCredentials: true,
  });
  };
  
  
  
  
//------------------------------ GET METHODS----------------------------------------------

export {
  userSignin,
  UserGoogleSignup,
  UserGoogleSignin,
  TokenRefresh,
  TripPlanning,     
  TripPlanningData,
  InviteFriends,
  Payment,
};
