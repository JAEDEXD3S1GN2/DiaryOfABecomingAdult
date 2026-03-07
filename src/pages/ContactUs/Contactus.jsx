import React from 'react'
import Contactcomp from '../../components/ContactUS/Contactcomp'
import { Mode } from '../../AppContext'
import { useContext, useEffect } from 'react'

const Contactus = () => {
  const token = sessionStorage.getItem("token");

  const LoginStatus = useContext(Mode);
    
        if(!token){
          LoginStatus.setIsLoggedin(false);
        }else {
          LoginStatus.setIsLoggedin(true);
        };
    
  

  return (
    <div>
        <Contactcomp />
    </div>
  )
}

export default Contactus