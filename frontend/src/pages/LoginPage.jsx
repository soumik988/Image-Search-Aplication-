import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookF, FaTwitter } from "react-icons/fa";

const LoginPage = () => {
  const handleLogin = (provider) => {
    window.open(`http://localhost:5000/auth/${provider}`, "_self");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white relative overflow-hidden">
      {/* Floating lights */}
      <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl top-20 left-10 animate-pulse" />
      <div className="absolute w-64 h-64 bg-pink-600/20 rounded-full blur-3xl bottom-20 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col justify-center items-center bg-gray-900/60 backdrop-blur-xl border border-purple-600/40 rounded-2xl p-10 shadow-[0_0_25px_rgba(168,85,247,0.3)]"
      >
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Image Search App
        </h1>
        <p className="text-gray-400 mb-8 text-sm">Sign in to explore amazing photos</p>

        <div className="flex flex-col gap-4 w-64">
          <button
            onClick={() => handleLogin("google")}
            className="flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>

          <button
            onClick={() => handleLogin("github")}
            className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg transition-all duration-200 font-semibold hover:scale-105 shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <FaGithub className="text-xl" /> Sign in with GitHub
          </button>

          <button
            onClick={() => handleLogin("facebook")}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg transition-all duration-200 font-semibold hover:scale-105 shadow-md hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]"
          >
            <FaFacebookF className="text-xl" /> Sign in with Facebook
          </button>

          
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
