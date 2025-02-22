import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg w-64">
      <img
        src={restaurant.featured_image || "https://via.placeholder.com/300"}
        alt={restaurant.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{restaurant.name}</h3>
        <div className="flex items-center text-sm mb-1">
          <span className="text-yellow-500 font-bold">⭐ {restaurant.user_rating?.aggregate_rating || "N/A"}</span>
          <span className="text-gray-500 ml-1">({restaurant.user_rating?.votes} votes)</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{restaurant.cuisines}</p>
        <p className="text-xs text-gray-500 truncate">{restaurant.location?.address}</p>
        <Link
          to={`/restaurants/${restaurant.id}`}
          className="mt-2 block bg-blue-600 text-white text-center py-1 rounded-lg text-sm hover:bg-blue-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
