import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const LocationSearch = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 12;
  const [searchParams] = useSearchParams(); // Get query params from URL

  useEffect(() => {
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const radius = searchParams.get("radius") || 10; // Default radius if missing

    if (latitude && longitude) {
      fetch(`https://restaurant-finder-vd3m.onrender.com/location?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
        .then((res) => res.json())
        .then((res) => setRestaurants(res.restaurants || [])) // Corrected this line
        .catch((err) => console.error("Error fetching restaurants:", err));
    }
  }, [searchParams]);

  // Pagination Logic
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // Change page
  const nextPage = () => {
    if (indexOfLastRestaurant < restaurants.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Nearby Restaurants</h2>

      <div className="grid grid-cols-4 gap-4">
        {currentRestaurants.length > 0 ? (
          currentRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {restaurants.length > restaurantsPerPage && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastRestaurant >= restaurants.length}
            className={`px-4 py-2 rounded-lg ${
              indexOfLastRestaurant >= restaurants.length ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
