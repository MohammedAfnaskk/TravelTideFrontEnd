import React, { useState, useEffect } from "react";
import { Card, Typography, dialog } from "@material-tailwind/react";
import jwt_decode from "jwt-decode";
import { userAxiosInstant } from "../../utils/axiosUtils";
import { Link } from "react-router-dom";
import InviteeTripPage, {
  TripDetailsPage,
} from "../../pages/UserUI/InvitaionTripPage/invitationTripPage";
import { setInvitations, clearInvitaions } from "../../redux/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define your table headers
const TABLE_HEAD = [
  "User Name",
  "Invitation Date",
  "Trip Place",
  "Status",
  "Actions",
];

export function ManageTripmates() {
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const email = decode.email;
  const [invites, setTripmates] = useState([]);

  useEffect(() => {
    const fetchTripmates = async () => {
      try {
        const response = await userAxiosInstant.get(
          `/travel_manager/manage-tripmates/${email}`
        );
        setTripmates(response.data);
        console.log("---->>>>>>>><<<<", response.data);
      } catch (error) {
        console.error("Error fetching invite details", error);
      }
    };

    fetchTripmates();
  }, [email]);

  console.log("--->>state", invites);

  const handleCancelInvite = (emailId) => {
    const requestData = {
      updatedStatus: "rejected",
    };

    userAxiosInstant
      .patch(`/travel_manager/users_invitation/${emailId}/`, requestData)
      .then((response) => {
        console.log(response.data);
        toast.success(" cancelled user successfully.");
      })
      .catch((error) => {
        console.error("Error accepting invitation", error);
        toast.error("Error accepting your request . Please try again.");
      });
  };

  const handleDeleteInvitation = (emailId) => {
     userAxiosInstant
      .delete(`/travel_manager/users_invitation/${emailId}/`)
      .then((response) => {
        console.log(response.data);
        toast.success("Invitation deleted successfully.");
        
        setTripmates((prevInvites) => prevInvites.filter((invite) => invite.id !== emailId));
      })
      .catch((error) => {
        console.error("Error deleting invitation", error);
        toast.error("Error deleting invitation. Please try again.");
      });
  };
  
  return (
    <>
      <div className="flex text-2xl font-bold gap-20 justify-center">
        <h4>MANAGE TRIPMATES</h4>
      </div>
      <hr className="w-full border-t border-gray-500 mt-3" />
      {invites.length === 0 ? (
        <div className="text-center mt-4 text-blue-gray-500 font-normal text-2xl">
          NO TRIPMATES
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
                      {row.send_to}
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
                    <button
                      onClick={() => handleCancelInvite(row.id)} // Use handleCancelInvite function
                      className="px-3 py-1 bg-red-900 text-white rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteInvitation(row.id)} // Use handleDeleteInvitation function
                      className="px-3 py-1 bg-red-900 text-white rounded-md"
                    >
                      Delete
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
