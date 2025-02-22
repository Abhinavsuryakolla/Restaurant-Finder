import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Restaurant App
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/restaurants" className="hover:text-gray-300">
            Restaurants
          </Link>
          <Link to="/search" className="hover:text-gray-300">
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;