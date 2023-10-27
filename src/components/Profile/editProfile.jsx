import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import jwt_decode from "jwt-decode";
import { GuideAxiosInstant } from "../../utils/axiosUtils";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProfile({ guide, childClick }) {
  const [open, setOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [profile, setProfile] = useState({
    profile_image: null,
    username: "",
    address: "",
    phone: "",
  });

  const handleOpen = () => {
    setProfile({
      profile_image: null,
      username: guide.username,
      address: guide.address,
      phone: guide.phone,
    });
    setOpen(!open);
  };

  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name);
    setProfile({ ...profile, profile_image: selectedFile });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const decode = jwt_decode(token);
    const guideId = decode.user_id;
    const UpdatedProfile = new FormData();
    UpdatedProfile.append("id", guideId);
    UpdatedProfile.append("username", profile.username);
    UpdatedProfile.append("address", profile.address);
    UpdatedProfile.append("phone", profile.phone);
    if (profile.profile_image) {
      UpdatedProfile.append("profile_image", profile.profile_image);
    }

    try {
      const response = await GuideAxiosInstant.patch(
        `/account/guide_details/${guideId}/`,
        UpdatedProfile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Updated Successfully");
      } else {
         if (response.status === 400) {
          toast.error("Bad Request");
        } else if (response.status === 404) {
          toast("Not Found");
        } else {
          toast("Error: " + response.status);
        }
      }
    } catch (error) {
      console.error("Error updating user details", error);
      toast.error("Error updating user details");
    }
    childClick();
    handleOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} className="bg-gray-300 text-black font-bold">
        <i className="fas fa-pencil-alt mr-2"></i> Edit
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Edit Profile</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-gray-700 text-sm">Profile Image</label>
              <div
                className="relative cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 py-2 px-4 rounded-lg text-sm"
                onClick={handleImageClick}
              >
                <span>Upload Image</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div className="mt-2">
                <img
                  src={
                    profile.profile_image
                      ? URL.createObjectURL(profile.profile_image)
                      : guide.profile_image
                  }
                  alt={selectedFileName}
                  className="max-w-xs max-h-40 rounded-lg border"
                />
              </div>
            </div>

            <Input
              label="Username"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <Input
              label="Address"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
            />

            <Input
              label="Mobile"
              type="tel"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="gradient" color="deep-orange" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
