import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! You can now log in.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.detail || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-purple-900 to-black p-5">
      <div className="w-full max-w-md p-8 bg-gray-900 text-white rounded-xl shadow-2xl border border-purple-500">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">Register</h2>

        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username Input */}
          <div className="flex items-center bg-gray-800 rounded-lg border border-purple-500 p-3">
            <FaUser className="text-purple-400 mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent w-full focus:outline-none text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center bg-gray-800 rounded-lg border border-purple-500 p-3">
            <FaEnvelope className="text-purple-400 mr-3" />
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
            className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
