import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Call API
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-xl shadow-2xl border border-purple-500">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="flex items-center bg-gray-800 rounded-lg border border-purple-500 p-3">
            <FaUser className="text-purple-400 mr-3" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full focus:outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-gray-800 rounded-lg border border-purple-500 p-3">
            <FaLock className="text-purple-400 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full focus:outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
