import PackagePlaceSearch from "./packageSearch"
import { ComplexNavbar } from "../../Navbar/navbar"
import TripPackageList from "./tripPackage"
import Footer from '../../../../components/footer/footer'

export const TripPackagePage=()=>{

    return(
       <div>
        <ComplexNavbar/>
        
        <PackagePlaceSearch/>
        
        <TripPackageList/>
          <Footer/>
        
        
       </div>

    )
}