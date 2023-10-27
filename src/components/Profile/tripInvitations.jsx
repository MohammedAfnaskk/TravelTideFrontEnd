import React, { useState, useEffect } from "react";
import { Card, Typography, dialog } from "@material-tailwind/react";
import jwt_decode from "jwt-decode";
import { userAxiosInstant } from "../../utils/axiosUtils";
import { Link } from "react-router-dom";
import InviteeTripPage, { TripDetailsPage } from "../../pages/UserUI/InvitaionTripPage/invitationTripPage";
import { useDispatch, useSelector } from "react-redux";
import { setInvitations, clearInvitaions } from "../../redux/userSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
useDispatch;

// Define your table headers
const TABLE_HEAD = [
  "User Name",
  "Invitation Date",
  "Trip Place",
  "Status",
  "Actions",
];

export function Invitation() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const email = decode.email;
  const [invites, setInvites] = useState([]);
  
  
  useEffect(() => {
    userAxiosInstant
      .get(`/travel_manager/users_invitations/${email}`)
      .then((response) => {
        setInvites(response.data);
        console.log('--->>>,',response.data);
        dispatch(clearInvitaions());
        dispatch(setInvitations(response.data));
      })
      .catch((error) => {
        console.error("Error fetching invite details", error);
      });
  }, []);

  const handleDelete = (emailId) => {
    const requestData = {
      updatedStatus: "rejected"
    };

    userAxiosInstant
      .patch(`/travel_manager/users_invitation/${emailId}/`, requestData)
      .then((response) => {
        console.log(response.data);
        toast.success("Trip cancelled successfully.");
      })
      .catch((error) => {
        console.error("Error accepting invitation", error);
        toast.error("Error accepting your request . Please try again.");
      });
  };

  return (
    <>
      <div className="flex text-2xl font-bold gap-20 justify-center">
        <h4>TRIP INVITATION</h4>
      </div>
      <hr className="w-full border-t border-gray-500 mt-3" />
      {invites.length === 0 ? (
        <div className="text-center mt-4 text-blue-gray-500 font-normal text-2xl">
          NO INVITATIONS
        </div>
      ) : (
      <Card className="h-96 w-full overflow-y-scroll mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invites.map((row) => (
              <tr key={row.id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.tripp.user_name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.date}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.tripp.main_place}
                  </Typography>
                </td>

                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row.status}
                  </Typography>
                </td>

                <td className="p-4 flex gap-4 ">
                  <Link
                    to={{
                      pathname: `/user/trip-page-invitee/${row.id}/${row.tripp.id}`,
                    }}
                  >
                    <button className="px-3 py-1 bg-deep-orange-600 text-white rounded-md">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(row.id)}
                    
                    className="px-3 py-1 bg-red-900 text-white rounded-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      )}
    </>

  );
}
