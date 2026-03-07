// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (

//   <motion.div
//   initial={{ opacity: 0, x: -150 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{ duration: 0.8 }}
// >
//     <main className="bg-cream min-h-screen flex items-center justify-center px-6 py-12">
//       <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-sm">
//         {/* Left (Message) */}
//         <div className="hidden md:flex flex-col justify-center bg-greenBrand text-white p-16">
//           <h1 className="text-4xl font-diary mb-6 leading-tight">
//             Begin Your Journey
//           </h1>
//           <p className="text-white/80 text-lg leading-relaxed">
//             Growth starts with intention. Create an account to read, listen, and
//             grow at your own pace.
//           </p>
//         </div>

//         {/* Right (Form) */}
//         <div className="p-10 md:p-16">
//           <h2 className="text-3xl font-diary text-blackBrand mb-8">
//             Create an Account
//           </h2>

//           <form className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-blackBrand mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-blackBrand mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-blackBrand mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Create a password"
//                 className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full rounded-full bg-orangeBrand py-4 text-blackBrand font-semibold transition hover:scale-[1.02] hover:opacity-90"
//             >
//               Create Account
//             </button>

//             <p className="text-sm text-center text-blackBrand/60">
//               Already have an account?{" "}
//               <Link to={"/Login"} className="text-greenBrand font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </main>
//     </motion.div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BaseUrl } from "../../../Baseconfig";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BaseUrl}api/auth/register`,
        formData
      );

      // console.log("Registration success:", response.data);
      toast.success("Account created successfully");
      navigateTo("/Login")

      // Optional: redirect after success
      // window.location.href = "/login";

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
      toast.error(`${err.response?.data?.message}`);
    } finally {
      setLoading(false);
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

          {/* Left Side */}
          <div className="hidden md:flex flex-col justify-center bg-greenBrand text-white p-16">
            <h1 className="text-4xl font-diary mb-6 leading-tight">
              Begin Your Journey
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Growth starts with intention. Create an account to read, listen, and grow at your own pace.
            </p>
          </div>

          {/* Right Side (Form) */}
          <div className="p-10 md:p-16">
            <h2 className="text-3xl font-diary text-blackBrand mb-8">
              Create an Account
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <div>
                <label className="block text-sm font-medium text-blackBrand mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
                  required
                />
              </div>

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
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blackBrand mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-blackBrand/10 px-4 py-3 focus:ring-2 focus:ring-greenBrand/40 focus:outline-none"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-orangeBrand py-4 text-blackBrand font-semibold transition hover:scale-[1.02] hover:opacity-90"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-sm text-center text-blackBrand/60">
                Already have an account?{" "}
                <Link to={"/Login"} className="text-greenBrand font-medium">
                  Sign in
                </Link>
              </p>

            </form>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Register;
