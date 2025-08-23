import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
   
  return (
    <div className="landing-pattern w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800">
      <main className="text-center space-y-8 animate-fadeIn font-poppins">
        <h1 className="text-6xl md:text-8xl font-bold text-white">D Grow</h1>
        <p className="text-xl md:text-2xl text-gray-300">Connect. Grow. Succeed.</p>
        <button
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
        >
          Login
        </button>
      </main>
    </div>
  );
}
