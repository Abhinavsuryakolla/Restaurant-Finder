import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const navigate = useNavigate();

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Location access denied. Please enable location services.");
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="w-full max-w-6xl p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Explore Restaurants</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Search by ID */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Search by ID</h2>
            <input
              type="text"
              placeholder="Enter Restaurant ID"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:ring focus:ring-gray-400 text-center"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
            />
            <Link
              to={restaurantId ? `/restaurants/${restaurantId}` : "#"}
              className={`mt-4 block w-full px-4 py-2 rounded-lg font-semibold transition-all text-white ${
                restaurantId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Search
            </Link>
          </div>

          {/* Search by Location */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Search by Location</h2>
            <button
              onClick={useMyLocation}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-all"
            >
              Use My Location
            </button>
            <input
              type="text"
              placeholder="Enter Latitude"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:ring focus:ring-gray-400 text-center"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Longitude"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:ring focus:ring-gray-400 text-center mt-2"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Radius (in km)"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:ring focus:ring-gray-400 text-center mt-2"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            />
            <Link
              to={latitude && longitude && radius ? `/location?latitude=${latitude}&longitude=${longitude}&radius=${radius}` : "#"}
              className={`mt-4 block w-full px-4 py-2 rounded-lg font-semibold transition-all text-white ${
                latitude && longitude && radius ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Search
            </Link>
          </div>

          {/* Search by Image */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Search by Image</h2>
            <button
              onClick={() => navigate("/image-search")}
              className="mt-4 block w-full px-4 py-2 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all"
            >
              Search
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SearchPage;