import PackagePlaceSearch from "./packageSearch"
import { UserComplexNavbar } from "../../Navbar/navbar"
import Footer from '../../../../components/footer/footer'

export const TripPackagePage=()=>{

    return(
       <div>
        <UserComplexNavbar/>
        
        <PackagePlaceSearch/>
        
           <Footer/>
        
        
       </div>

    )
}