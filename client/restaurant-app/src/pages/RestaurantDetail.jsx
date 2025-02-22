import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantDetail = () => {
  const { id } = useParams();
  console.log("Restaurant ID:", id);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
      setLoading(false);
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!restaurant) {
    return <div className="flex justify-center items-center h-screen">Restaurant not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">{restaurant.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={restaurant.featured_image || "https://via.placeholder.com/600"}
            alt={restaurant.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg text-gray-700">{restaurant.cuisines}</p>
          <p className="text-sm text-gray-500">{restaurant.location?.address}</p>
          <p className="text-sm text-gray-500">Rating: {restaurant.user_rating?.aggregate_rating}</p>
          <p className="text-sm text-gray-500">Votes: {restaurant.user_rating?.votes}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;