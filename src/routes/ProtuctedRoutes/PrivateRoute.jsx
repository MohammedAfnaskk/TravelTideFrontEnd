import jwt_decode from "jwt-decode";
import { Outlet } from "react-router-dom";
import UserHomePage from "../../pages/UserUI/home/home";
import GuideHomePage from "../../pages/GuideUI/home/home";
import AdminHomePage from "../../pages/AdminUI/dashboard";
import UnknownPage from "../../pages/404_Page/404_page";
 
function PrivateRoutes() {
  const token = localStorage.getItem('token');
  console.log("----->token",token);
  if (token) {
    const decode = jwt_decode(token);
    console.log("---->decode",decode)
    console.log("------->role",decode.role)

    if (decode.role=== 'user') {
    return <UserHomePage />
    } else if (decode.role === 'guide'){
    return <GuideHomePage/>
    } else if (decode.role === 'admin' && decode.is_admin){
    return <AdminHomePage/>
   
    } else{
        return <UnknownPage/>
    }
  }
  return <Outlet/>
}

export default PrivateRoutes
