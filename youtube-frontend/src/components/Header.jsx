import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <header className="bg-white shadow px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-red-600">
        YouTube Clone
      </Link>

      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-md mx-4"
      >
        <input
          type="text"
          placeholder="Search videos..."
          className="flex-1 border border-gray-300 rounded-l px-3 py-1 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-1 rounded-r"
        >
          Search
        </button>
      </form>

      {user ? (
        <div className="flex items-center gap-3">
          
          <Link
            to="/upload"
            className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200"
          >
            Upload
          </Link>

          <img
            src={user.avatar || "https://i.pravatar.cc/40"}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">{user.username}</span>
          <button
            onClick={logout}
            className="text-sm text-red-600 hover:underline ml-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/signin"
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;
