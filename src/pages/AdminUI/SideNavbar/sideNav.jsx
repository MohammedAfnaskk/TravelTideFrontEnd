import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import image from "../../../assets/image/user.png";
import { useNavigate } from "react-router-dom";
 
export default function AdminSideNav(props) {
  const { setDisplayedComponent } = props;
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const LogoutButton = () => {
      localStorage.removeItem("token");
      navigate('/admin/login')
     };

  

  return (
    <Card className=" w-full max-w-[20rem] p-4 shadow-xl bg-white shadow-blue-gray-900/5 rounded-none">
      <List>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("myDashboard")}>
            Dashboard
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
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("manageGuide")}>
            Guide List
          </button>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("manageUser")}>
            User List
          </button>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("adminTripPlan")}>
            Trip Plan
          </button>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={() => setDisplayedComponent("tripDemoList")}>
            Trip Guide List
          </button>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={LogoutButton}>Log Out</button>
        </ListItem>
      </List>
    </Card>
  );
}
