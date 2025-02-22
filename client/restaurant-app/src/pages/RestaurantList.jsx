import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurants?page=${page}&limit=12`);
        setRestaurants(response.data.restaurants);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [page]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Restaurants</h1>
      
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all"
        >
          Previous
        </button>
        <span className="text-lg font-semibold self-center">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;