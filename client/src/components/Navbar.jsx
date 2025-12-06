import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-400 text-white shadow-lg px-6 py-2 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <img
            src={"/hubscredo_image.png"}
            alt="Logo"
            className="w-45 h-10 rounded-full border border-white"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-xl font-semibold text-white hover:text-gray-200 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/login"
          className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded-md transition"
          onClick={() => {
            Cookies.remove("jwt_token");
            navigate("/login");
          }}
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
