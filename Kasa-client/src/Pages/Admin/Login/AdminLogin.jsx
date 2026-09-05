import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

import logo from "../../../assets/kasa-logo-footer.png";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:5000/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Invalid email or password.");
      return;
    }

    // Store JWT token
    localStorage.setItem("adminToken", data.token);

    // Store admin information
    localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

    // Go to dashboard
    navigate("/admin/dashboard");

  } catch (error) {
    console.error("Login Error:", error);

    setError(
      "Unable to connect to the server. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-5 py-10">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >

        {/* Login Card */}
        <div className="bg-[#F5F1E8] border border-[#B58A4A]/40 shadow-2xl rounded-sm overflow-hidden">

          {/* Logo Section */}
          <div className="flex flex-col items-center pt-8 pb-6 border-b border-[#D9CCB5]">

            <img
              src={logo}
              alt="KASA LUXE"
              className="w-28 h-auto object-contain"
            />

            <h1 className="mt-3 font-['Cormorant_Garamond'] text-4xl font-semibold tracking-wide text-[#B58A4A]">
              KASA LUXE
            </h1>

            <p className="mt-1 font-['Outfit'] text-xs tracking-[3px] uppercase text-[#5C5146]">
              Admin Portal
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="p-7 sm:p-9"
          >

            {/* Heading */}
            <div className="text-center mb-8">

              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#2F2923]">
                Welcome Back
              </h2>

              <p className="font-['Outfit'] text-sm text-gray-500 mt-2">
                Sign in to manage your sculptures and website.
              </p>

            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm font-['Outfit']"
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div className="mb-5">

              <label className="block mb-2 font-['Outfit'] text-sm font-medium text-[#3D352D]">
                Admin Email
              </label>

              <div className="relative">

                <HiOutlineMail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#B58A4A]
                    text-xl
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3.5
                    bg-white
                    border
                    border-[#D9CCB5]
                    outline-none
                    font-['Outfit']
                    text-sm
                    text-[#2F2923]
                    placeholder:text-gray-400
                    focus:border-[#B58A4A]
                    transition
                    duration-300
                  "
                />

              </div>

            </div>

            {/* Password */}
            <div className="mb-6">

              <label className="block mb-2 font-['Outfit'] text-sm font-medium text-[#3D352D]">
                Password
              </label>

              <div className="relative">

                {/* Lock Icon */}
                <HiOutlineLockClosed
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#B58A4A]
                    text-xl
                  "
                />

                {/* Password Input */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="
                    w-full
                    pl-12
                    pr-12
                    py-3.5
                    bg-white
                    border
                    border-[#D9CCB5]
                    outline-none
                    font-['Outfit']
                    text-sm
                    text-[#2F2923]
                    placeholder:text-gray-400
                    focus:border-[#B58A4A]
                    transition
                    duration-300
                  "
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#8A7965]
                    hover:text-[#B58A4A]
                    transition
                    duration-300
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="text-xl" />
                  ) : (
                    <HiOutlineEye className="text-xl" />
                  )}
                </button>

              </div>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3.5
                bg-[#B58A4A]
                text-white
                uppercase
                tracking-[2px]
                font-['Outfit']
                text-sm
                font-medium
                hover:bg-[#967039]
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

        {/* Back to Website */}
        <motion.button
          type="button"
          onClick={() => navigate("/")}
          whileHover={{ y: -2 }}
          className="
            block
            mx-auto
            mt-6
            text-gray-400
            hover:text-[#B58A4A]
            font-['Outfit']
            text-sm
            transition
            duration-300
          "
        >
          ← Back to KASA LUXE Website
        </motion.button>

      </motion.div>

    </div>
  );
}