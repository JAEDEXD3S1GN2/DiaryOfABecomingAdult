import React from 'react'
import About from '../../components/About/AboutComp'
import { Mode } from '../../AppContext'
import { useContext, useEffect } from 'react'


const Aboutus = () => {

    const token = sessionStorage.getItem("token");

    const LoginStatus = useContext(Mode);
        
            if(!token){
              LoginStatus.setIsLoggedin(false);
            }else {
              LoginStatus.setIsLoggedin(true);
            };
        

  return (
    <div>
        <About />
    </div>
  )
}

export default Aboutus