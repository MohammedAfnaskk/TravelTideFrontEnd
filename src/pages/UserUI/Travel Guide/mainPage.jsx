import React from "react";
import PackagePlaceSearch from "./TripGuidingPageSearch";
import { UserComplexNavbar } from "../Navbar/navbar";
import { ComplexNavbar } from "../../GuideUI/GuideNavbar/navbar";
import TripGuidingList from "./travelGuideList";
import Footer from "../../../components/footer/footer";
import jwt_decode from "jwt-decode";

export const TripGuidingPage = () => {
  let isGuide = ''
  const token = localStorage.getItem("token");
  if (token){
    const decode = jwt_decode(token);

    isGuide = decode && decode.role === "guide";
  }
  

  return (
    <div>
      {isGuide ? <ComplexNavbar /> : <UserComplexNavbar />}

      <PackagePlaceSearch />

      <Footer />
    </div>
  );
};
