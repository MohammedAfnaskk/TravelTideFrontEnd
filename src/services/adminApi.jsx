import { adminAxiosInstant } from "../utils/axiosUtils";
<<<<<<< HEAD
//----------------post-------------------//
=======

>>>>>>> origin/main
const AdminSignin = (values) => {
  return adminAxiosInstant.post("token/", values, { withCredentials: true });
};

<<<<<<< HEAD
//--------------------put----patch---------------//
const GuideBlockUnBlock = (data, id) => {
  return adminAxiosInstant
    .patch(`guideblockunblock/${id}/`,data, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

const UserBlockUnBlock = (data, id) => {
  return adminAxiosInstant
    .patch(`userblockunblock/${id}/`,data, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};



// Get all UserList
const UsersList = (search) => {
  return adminAxiosInstant
    .get(`userslist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};


// Get all UserList
const GuideList = (search) => {
  return adminAxiosInstant
    .get(`guidelist/?page=1&search=${search}`, {
      withCredentials: true,
    })
    .catch((error) => {
      throw error;
    });
};

 
export default {
  AdminSignin,
  GuideBlockUnBlock,
  UserBlockUnBlock,
  UsersList,
  GuideList
 };
=======
export  {AdminSignin};
>>>>>>> origin/main
