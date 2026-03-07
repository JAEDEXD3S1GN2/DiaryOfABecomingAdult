import React, {useContext, useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken } from "../../../utils/authUtils";
import { Mode } from "../../AppContext";



const AdminRoute = ({ children }) => {

  const user = getUserFromToken();

    const LoginStatus = useContext(Mode);
  const token = sessionStorage.getItem("token");

  
      if(!token){
        LoginStatus.setIsLoggedin(false);
      }else {
        LoginStatus.setIsLoggedin(true);
      };
  

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {

    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;