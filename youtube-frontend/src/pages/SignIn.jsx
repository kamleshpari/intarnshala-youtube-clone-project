import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Sign In</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Sign In
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
