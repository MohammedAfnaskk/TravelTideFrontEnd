import React, { useState, useEffect } from "react";
import { Card, Typography, dialog } from "@material-tailwind/react";
import { userAxiosInstant } from "../../utils/axiosUtils";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserChat from "../ChatBox/chatBox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define your table headers
const TABLE_HEAD = [
  "User Name",
  "Join Date",
  "Trip Place",
  "Payment Amount",
  "Status",
  "Chat",
];

export function ManageTripmatesGuide() {
  const [user_payments, setTripmates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const user_id = decode.user_id;

    const fetchTripmates = async () => {
      try {
        const response = await userAxiosInstant.get(
          `/payments/user-payment-details/${user_id}/`
        );
        setTripmates(response.data);
        console.log("---->>>>>>>><<<<", response.data);
      } catch (error) {
        console.error("Error fetching invite details", error);
      }
    };

    fetchTripmates();
  }, []);

  console.log("--->>state", user_payments);

  return (
    <>
      <div className="flex text-2xl font-bold gap-20 justify-center">
        <h4>MANAGE TRIPMATES P</h4>
      </div>
      <hr className="w-full border-t border-gray-500 mt-3" />
      {user_payments.length === 0 ? (
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
              {user_payments.map((row) => (
                <tr key={row.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.user_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.payment_date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.trip_details.main_place}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.trip_details.budget}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      style={{ color: row.payment ? 'green' : 'red' }}
                      className="font-normal"
                    >
                      {row.payment ? "Success" : "Canceled"}
                    </Typography>
                  </td>
                  <td className="p-4">
                   <UserChat recieverid={row.user}/>
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
