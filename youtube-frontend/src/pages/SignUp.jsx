import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [channelName, setChannelName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoId, setLogoId] = useState("");

  const { register } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        channelName,
        email,
        password,
        phone,
        logoUrl,
        logoId,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Sign Up</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <label className="block mb-1 text-sm font-medium">Channel Name</label>
        <input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" required />

        <label className="block mb-1 text-sm font-medium">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" required />

        <label className="block mb-1 text-sm font-medium">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" required />

        <label className="block mb-1 text-sm font-medium">Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" />

        <label className="block mb-1 text-sm font-medium">Logo URL</label>
        <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="w-full border px-3 py-2 rounded mb-3" />

        <label className="block mb-1 text-sm font-medium">Logo ID</label>
        <input type="text" value={logoId} onChange={(e) => setLogoId(e.target.value)} className="w-full border px-3 py-2 rounded mb-6" />

        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-red-600 hover:underline">Sign In</a>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
