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
   return userAxiosInstant
    .post("account/token/refresh/", value, {
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
  return userAxiosInstant
    .post("account/googleregistration/", values, {
      withCredentials: true,
    })
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
  return userAxiosInstant.post("account/token/", values, {
    withCredentials: true,
  });
};

// Create TripPlan
const TripPlanning = (value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.post("travel_manager/main-place/", value, {
    withCredentials: true,
  });
};

const TripPlanningData = (value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.post("travel_manager/trip-planning/", value, {
    withCredentials: true,
  });
};

const InviteFriends = (value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.post("travel_manager/invite-friends/", value, {
    withCredentials: true,
  });
};

const Payment = (value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.post("payments/", value, {
    withCredentials: true,
  });
};

// Get  GuidingTip Details
const GuidingTripList = (search) => {
  return userAxiosInstant
    .get(`travel_manager/trip-guiding/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

//------------------------------ PATCH METHODS----------------------------------------------

const EditTripPlanning = (id, value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.put(`travel_manager/main-place/${id}/`, value, {
    withCredentials: true,
  });
};

const EditPlanningData = (id, value) => {
  console.log("Data being sent to the backend:", value);
  return userAxiosInstant.put(`travel_manager/trip-planning/${id}/`, value, {
    withCredentials: true,
  });
};
 

export {
  userSignin,
  UserGoogleSignup,
  UserGoogleSignin,
  TokenRefresh,
   TripPlanning,
  TripPlanningData,
  InviteFriends,
  Payment,
  EditTripPlanning,
  EditPlanningData,
  GuidingTripList,
 
};
