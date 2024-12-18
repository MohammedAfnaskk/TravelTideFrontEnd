import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  BugAntIcon,
  CheckIcon,
  CheckCircleIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function SideMenuBar(props) {
  const { setDisplayedComponent } = props;
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const role = decode.role;

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleNavigateChatGuide = () => {
    navigate("/guide/chat-list");
  };
  const start_Planning_Navigate_Guide = () => {
    navigate("/guide/location_plan/");
  };

  const handleNavigateChatUser = () => {
    navigate("/user/chat-list");
  };
  const start_Planning_Navigate_User = () => {
    navigate("/user/location_plan/");
  };

  return (
    <Card className="h-auto w-full max-w-[17.5rem] p-4 mt-10 border border-gray-300 bg-gray-300 sm:max-w-[15rem] md:max-w-[20rem] lg:max-w-[25rem]">
      <div className="p-4">
        <Typography variant="h5" color="blue-gray" className="text-center sm:text-left">
          Settings
        </Typography>
        {role == "user" && (
          <button
            onClick={start_Planning_Navigate_User}
            className="rounded-lg bg-[#f75940] text-white h-8 w-32 lg:ml-24 sm:mx-auto sm:block"
          >
            Start planning
          </button>
        )}
        {role == "guide" && (
          <button
            onClick={start_Planning_Navigate_Guide}
            className="rounded-lg bg-[#f75940] text-white h-8 w-32 lg:ml-24 sm:mx-auto sm:block"
          >
            Start planning
          </button>
        )}
      </div>

      <List>
        <hr className="border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("myTripPlans")}>
            Trip Plans
          </button>
        </ListItem>

        {role !== "user" && (
          <>
            <ListItem>
              <ListItemPrefix>
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={handleNavigateChatGuide}>Chat</button>
              <ListItemSuffix></ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={() => setDisplayedComponent("joinedTripmates")}>
                Joined Tripmates
              </button>
              <ListItemSuffix></ListItemSuffix>
            </ListItem>
          </>
        )}
        {role !== "guide" && (
          <>
            <ListItem>
              <ListItemPrefix>
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={handleNavigateChatUser}>Chat</button>
              <ListItemSuffix></ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={() => setDisplayedComponent("manageTripmates")}>
                Manage Tripmates
              </button>
              <ListItemSuffix></ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <CheckCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={() => setDisplayedComponent("joinedTrips")}>
                Joined Trips
              </button>
              <ListItemSuffix></ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={() => setDisplayedComponent("invitation")}>
                Trip Invitation
              </button>
            </ListItem>
          </>
        )}
      </List>
    </Card>
  );
}
