import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import Logo from "../../assets/images/Doaba-edit.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useContext } from 'react';
import { Mode } from '../../AppContext';
import { div } from 'framer-motion/client';
import toast from 'react-hot-toast';
import { removeToken } from '../../../utils/tokenService';
import { isAdmin } from '../../../utils/tokenService';


const Navbar = () => {

  const [mobileNav, setMobileNav] = useState(false);

  const LoginStatus = useContext(Mode);

  const showMobileNav = () => {
      setMobileNav(true);
  }

  const closeNav = () => {
    setMobileNav(false);
  }

 const handleLogout = () => {
  removeToken();
   sessionStorage.removeItem("role");
  toast.success("you've Logged out successfully");
    navigate("/");
};



  return (
    <>
    <div className=" fixed top-0 bg-white left-0 w-full z-50 shadow-md sm:flex sm:justify-between sm:items-center sm:border-b sm:py-3.5 sm:px-2 sm:border-black hidden">
         <Link to={"/"}><img className="w-20 h-15" src={Logo} alt="Doabalogo" /></Link>
         <div className='text-orangeBrand flex gap-3 font-semibold text-2xl font-Worksans'>
         <Link to={"/"} className='hover:text-black'>Home</Link> 
         <Link to={"/Blog"} className='hover:text-black'>Blog</Link> 
         <Link to={"/Contact"} className='hover:text-black'>Contact Us</Link> 
         <Link to={"/about"} className='hover:text-black'>About</Link>
         {LoginStatus.isLoggedin && isAdmin() && (
            <Link to={"/create-post"} className='hover:text-black'>
              Create Post
            </Link>
)}
  {LoginStatus.isLoggedin && isAdmin() && (
            <Link to={"/Admin"} className='hover:text-black'>
              Dashboard
            </Link>
)}

         </div>
         
        {LoginStatus.isLoggedin ? (<div><Link className='bg-orangeBrand px-3 py-2 rounded-lg text-white font-Worksans hover:bg-black ease-in transition duration-500' onClick={()=> handleLogout()}>Logout</Link></div>) : (<div className='flex gap-3 text-orangeBrand'><Link to={"/Login"} className='text-2xl hover:text-black'><FaUser /></Link>
         <Link to={"/"} className='text-2xl hover:text-black'><FaNewspaper /></Link>
         </div>)}
    </div>

    {/* MOBILE NAVBAR */}
<div className="fixed top-0 left-0 w-full z-50 sm:hidden bg-white shadow-md border-b border-black">

  <div className="flex justify-between items-center py-3 px-4">

    <img className="w-20 h-15" src={Logo} alt="Doabalogo" />

    {/* Hamburger Button */}
    <button
      onClick={() => setMobileNav(!mobileNav)}
      className="relative w-8 h-8 flex flex-col justify-center items-center group"
    >

      <span
        className={`absolute h-0.5 w-7 bg-orangeBrand transition-all duration-300 
        ${mobileNav ? "rotate-45" : "-translate-y-2"}`}
      />

      <span
        className={`absolute h-0.5 w-7 bg-orangeBrand transition-all duration-300
        ${mobileNav ? "opacity-0" : ""}`}
      />

      <span
        className={`absolute h-0.5 w-7 bg-orangeBrand transition-all duration-300
        ${mobileNav ? "-rotate-45" : "translate-y-2"}`}
      />

    </button>

  </div>


  {/* MOBILE MENU */}
  <div
    className={`transition-all duration-300 overflow-hidden
    ${mobileNav ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
  >

    <div className="mx-4 mb-4 rounded-2xl bg-white shadow-lg p-6 flex flex-col gap-5">

      <div className="text-orangeBrand flex flex-col gap-4 font-semibold text-xl font-Worksans">

        <Link onClick={closeNav} to={"/"} className="hover:text-black transition">
          Home
        </Link>

        <Link onClick={closeNav} to={"/Blog"} className="hover:text-black transition">
          Blog
        </Link>

        <Link onClick={closeNav} to={"/Contact"} className="hover:text-black transition">
          Contact Us
        </Link>

        <Link onClick={closeNav} to={"/about"} className="hover:text-black transition">
          About
        </Link>

        {LoginStatus.isLoggedin && isAdmin() && (
          <Link onClick={closeNav} to={"/create-post"} className="hover:text-black transition">
            Create Post
          </Link>
        )}

        {LoginStatus.isLoggedin && isAdmin() && (
          <Link onClick={closeNav} to={"/admin"} className="hover:text-black transition">
            Dashboard
          </Link>
        )}

      </div>


      {/* AUTH SECTION */}
      {LoginStatus.isLoggedin ? (

        <button
          onClick={() => {
            handleLogout();
            closeNav();
          }}
          className="bg-orangeBrand text-white py-2 rounded-lg font-semibold hover:bg-black transition"
        >
          Logout
        </button>

      ) : (

        <div className="flex gap-5 text-orangeBrand text-2xl">

          <Link onClick={closeNav} to={"/Login"} className="hover:text-black transition">
            <FaUser />
          </Link>

          <Link onClick={closeNav} to={"/"} className="hover:text-black transition">
            <FaNewspaper />
          </Link>

        </div>

      )}

    </div>

  </div>

</div>
   </> 
  )
}

export default Navbar