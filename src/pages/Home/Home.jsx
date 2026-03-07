import React from 'react'
import Hero from '../../components/Hero/Hero'
import WWE from '../../components/WhyweExist/WWE'
import Themes from '../../components/Whattogain/WhatTG'
import HowItWorks from '../../components/howweoperate/HWO'
import CTA from '../../components/CTA/CTA'
import { Mode } from '../../AppContext'
import { useContext, useState, useEffect } from 'react'


const Home = () => {

  const token = sessionStorage.getItem("token");



    const LoginStatus = useContext(Mode);

    if(!token){
      LoginStatus.setIsLoggedin(false);
    }else {
      LoginStatus.setIsLoggedin(true);
    };

  
  return (
    <>
        <Hero />
        <Themes />
        <HowItWorks />
        <CTA />
    </>
  )
}

export default Home