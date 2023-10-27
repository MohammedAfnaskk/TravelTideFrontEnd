import PackagePlaceSearch from "./packageSearch"
import { UserComplexNavbar } from "../../Navbar/navbar"
import TripPackageList from "./tripPackage"
import Footer from '../../../../components/footer/footer'

export const TripPackagePage=()=>{

    return(
       <div>
        <UserComplexNavbar/>
        
        <PackagePlaceSearch/>
        
        <TripPackageList/>
          <Footer/>
        
        
       </div>

    )
}