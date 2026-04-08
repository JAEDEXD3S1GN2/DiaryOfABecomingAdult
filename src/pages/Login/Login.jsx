import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { saveToken } from "../../../utils/tokenService";
import { BaseUrl } from "../../../Baseconfig";


const API_BASE = (BaseUrl || "").replace(/\/+$/g, "");

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Signing you in...");

    try {
      const res = await axios.post(
        `${API_BASE}/api/auth/login`,
        formData
      );

     const { token, user } = res.data;

      // 🔐 Encrypt + Store token
      saveToken(token);

      toast.success("Login successful 🎉", { id: loadingToast });
        sessionStorage.setItem("role", user.role);
      // 🚀 Navigate to home
    
      if (user.role === "admin") {
          navigate("/admin");
      } else {
     navigate("/");
    //     if(!token){
    //   LoginStatus.setIsLoggedin(false);
    // }else {
    //   LoginStatus.setIsLoggedin(true);
    // };
                    }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed",
        { id: loadingToast },
        console.log(error)
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <main className="bg-cream min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm">

          {/* Left (Form) */}
          <div className="p-10 md:p-16">
            <h2 className="text-3xl font-diary text-blackBrand mb-8">
              Welcome Back
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div>
                <label className="block text-sm font-medium text-blackBrand mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blackBrand mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 pr-12 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blackBrand/60 hover:text-blackBrand transition"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-orangeBrand py-4 text-blackBrand font-semibold transition hover:scale-[1.02] hover:opacity-90"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-blackBrand/60">
                <a href="#" className="hover:underline">
                  Forgot your password?
                </a>
              </div>

              <p className="text-sm text-center text-blackBrand/60">
                Don't have an account?{" "}
                <Link to="/Register" className="text-greenBrand font-medium">
                  Create one
                </Link>
              </p>

            </form>
          </div>

          {/* Right (Message) */}
          <div className="hidden md:flex flex-col justify-center bg-blackBrand text-white p-16">
            <h1 className="text-4xl font-diary mb-6 leading-tight">
              Still Becoming
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Welcome back. Continue where you left off — one thought, one lesson,
              one moment at a time.
            </p>
          </div>

        </div>
      </main>
    </motion.div>
  );
};

export default Login;
