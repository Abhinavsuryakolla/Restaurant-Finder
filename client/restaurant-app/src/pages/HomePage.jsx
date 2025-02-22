import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../assets/background.jpg'; // Adjust the path as needed
const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Replace with your image URL
        filter: "brightness(90%)", // Dim the background image
      }}
    >
      <div className="p-8 rounded-lg text-center">
        {/* Bright text with drop shadow */}
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Restaurant App
        </h1>
        <p className="text-xl text-gray-100 mb-8 drop-shadow-md">
          Discover the best restaurants near you
        </p>
        <div className="space-x-4">
          <Link
            to="/restaurants"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            View Restaurants
          </Link>
          <Link
            to="/search"
            className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;