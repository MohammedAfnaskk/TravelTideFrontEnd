import React, { useState,useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import invite from "../../assets/image/invite.png";
import { InviteFriends } from "../../services/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export function InviteFriend() {
  const location = useLocation();
  const trip_id = location.state && location.state.id;
  const [size, setSize] = useState(null);
  const [copyLink, setCopyLink] = useState("");
  const [email, setInvitationEmail] = useState("");

  const handleOpen = (value) => setSize(value);



  useEffect(() => {
    setCopyLink(`http://localhost:5173/user/trip-page-invitee/${trip_id}`);
  }, [trip_id]);
  
  

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Copy failed:', error);
      toast.error('Error copying link');
    }
  };

  const SendInvitationFriends = async () => {
    try {
      const response = await InviteFriends({ email, trip_id });
      if (response.status === 200) {
        toast.success("Invitation sent successfully");
      } else {
        console.log("Error Response:", response.data);
        toast.error("Error sending invitation");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error sending invitation");
    }
  };

  return (
    <>
      <div className="mb-3 flex gap-3">
        <button onClick={() => handleOpen("sm")}>
          <img src={invite} className="w-4 h-4 ml-56" alt="Invite" />
        </button>
      </div>
      <Dialog open={size === "sm"} size={size || "md"} handler={() => handleOpen(null)}>
        <DialogHeader>Invite Trip Mates</DialogHeader>
        <DialogBody divider>
          <div className="relative">
            <p>Copy Link:</p>
            <div className="relative w-full flex  ">
              <Input
                placeholder="Copy the link here"
                value={copyLink}
                onChange={(e) => setCopyLink(e.target.value)}
                className="pr-10"
              />
              <Button variant="gradient" color="deep-orange" onClick={handleCopyLink}>
                Copy
              </Button>
            </div>
          </div>
          <p className="mt-4">Invitation Email:</p>
          <Input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setInvitationEmail(e.target.value)}
          />
          <Button variant="gradient" color="deep-orange" onClick={SendInvitationFriends} className="mt-2">
            Send Invitation
          </Button>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="black">
            <p> Manage Tripmates</p>
          </Button>
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
