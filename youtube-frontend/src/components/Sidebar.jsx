import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-red-600 font-medium">
          🏠 Home
        </Link>

        {user && (
          <Link
            to={`/channel/${user.channels?.[0] || "my-channel"}`}
            className="hover:text-red-600 font-medium"
          >
            📺 My Channel
          </Link>
        )}

        <Link to="#" className="hover:text-red-600 font-medium">
          🔔 Subscriptions
        </Link>
        <Link to="#" className="hover:text-red-600 font-medium">
          📈 Trending
        </Link>
        <Link to="#" className="hover:text-red-600 font-medium">
          💾 Library
        </Link>
        <Link to="#" className="hover:text-red-600 font-medium">
          📚 Watch Later
        </Link>
        <Link to="#" className="hover:text-red-600 font-medium">
          📁 History
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;

