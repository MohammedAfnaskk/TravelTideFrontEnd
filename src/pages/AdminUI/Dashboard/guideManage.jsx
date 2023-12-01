import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Input } from "@material-tailwind/react";
import { adminAxiosInstant } from "../../../utils/axiosUtils";
import adminApi from '../../../services/adminApi'
import { toast } from 'react-toastify';
import _ from "lodash"; 


const TABLE_HEAD = ["UserName", "Roll", "Email","Mobile","join_date","Action"];

export default function GuideManage() {
  const [guideDetails, setGuideDetails] = useState([]);
  const [Search, setSearch] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);

  const handleSearch = async (searchTerm) => {
    setSearch(searchTerm);
    handleLoading();

    try {
      const res = await adminApi.GuideList(searchTerm.toString());
      if (res.data && res.data.length > 0) {
        setFilteredUserList(res.data);
      } else {
        setFilteredUserList([]);
      }
      handleLoading();
    } catch (error) {
      handleLoading();
      console.log(error);
    }
  };

  const debouncedSearch = _.debounce(handleSearch, 300);

  useEffect(() => {
    adminAxiosInstant
      .get(`guide_details/`)
      .then((response) => {
        setGuideDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, []);

  const BlockUnblock = async (value, id) => {
    const data = {
      is_active: value,
    };
    try {
      const res = await adminApi.GuideBlockUnBlock(data, id);
  
      if (res.status === 200) {
        setGuideDetails((prevGuideDetails) =>
        prevGuideDetails.map((guide) =>
          guide.id === id ? { ...guide, is_active: value } : guide
        )
      );
        if (res.data.is_active === true) {
          toast.success("Unblocked successfully");
        } else {
          toast.success("Blocked successfully");
        }
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong");
    }
  };

  // Loading state
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  return (
    <>
      <div className="flex items-start h-12 text-black text-4xl font-bold  mt-4">
        Guide Details
      </div>
      <div className="relative flex w-3/6 gap-2 mb-4 ">
        <Input
          type="search"
          color="black"
          label="Type here..."
          value={Search}
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSearch(e.target.value);
        }}

        />

        <Button
          size="sm"
          color="black"
          className="!absolute right-1 top-1 rounded"
          onClick={() => handleSearch(Search)}
        >
          Search
        </Button>

       
      </div>
      <Card className="h-screen w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
          {(Search ? filteredUserList : guideDetails).length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    No results found for "{Search}"
                  </Typography>
                </td>
              </tr>
            ) : (
              (Search ? filteredUserList : guideDetails).map(
                (
                  { username, role, email, phone, date_joined, is_active, id },
                  index
                ) => (
                  <tr key={username} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {username}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {role}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>

                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {phone}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date_joined
                        ? new Date(date_joined).toISOString().split("T")[0]
                        : ""}
                    </Typography>
                  </td>
                  <td className="p-4">
  
               <div className="flex justify-center items-center">
              {is_active==true ? (
                <Button
                  className="bg-red-900 px-3 py-2  text-white font-bold"
                  onClick={() => BlockUnblock(false,id)}
                >
                  Block
                </Button>
              ) : (
                <Button
                  className="ms-3 bg-blue-400 px-5 py-2  text-white font-bold"
                  onClick={() => BlockUnblock(true,id)}
                >
                  Unblock
                </Button>
              )}
            </div>
                  </td>
                </tr>
                )
              )
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}
