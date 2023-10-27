import jwtDecode from "jwt-decode"
import { Outlet } from "react-router-dom"
import UserHomePage from "../../pages/UserUI/home/home";
import GuideHomePage from "../../pages/GuideUI/home/home";
import AdminHomePage from "../../pages/AdminUI/dashboard";
import UnknownPage from "../../pages/404_Page/404_page";


function GuideProtected(){
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)

        if (decoded.role === 'user'){
            return <UserHomePage/>
        }else if (decoded.role === 'guide'){
            return <Outlet/>
        }else if (decoded.role === 'admin' && decoded.is_admin){
            return <AdminHomePage/>
        }
    }else{
        return <UnknownPage/>
    }
}

export default GuideProtected;