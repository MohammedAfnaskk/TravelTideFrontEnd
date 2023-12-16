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
  TagIcon,ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export function SideMenuBar(props) {
  const { setDisplayedComponent } = props;
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  const role = decode.role;

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleNavigate =()=>{
    navigate('/guide/chat-list')
  }

  return (
    <Card className="  h-84 bg-gray-300 w-full max-w-[17.5rem] p-4 mt-10 border border-gray-300">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Settings
        </Typography>
      </div>
      <List>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("myTripPlans")}>
            Trip Plans
          </button>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={handleNavigate}>
            Chat 
          </button>
          <ListItemSuffix>
            <Chip
              value="4"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

        {role !== "user" && (
          <>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("joinedTripmates")}>
            Joined Tripmates
          </button>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
         
   
        </>

        )}
        {role !== "guide" && (
          <>
                  <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("manageTripmates")}>
            Manage Tripmates
          </button>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>

            <ListItem>
              <ListItemPrefix>
                <CheckCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <button onClick={() => setDisplayedComponent("joinedTrips")}>
                Joined Trips
              </button>
              <ListItemSuffix>
                <Chip
                  value="1"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
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
