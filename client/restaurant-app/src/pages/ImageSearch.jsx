import React, { useState } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";

const ImageSearch = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [query, setQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const restaurantsPerPage = 12; // 12 restaurants per page
  const restaurantsPerRow = 4; // 4 restaurants per row

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setRestaurants([]);
      setSearchTags([]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !query) {
      setError("Please select an image or enter a cuisine/dish");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response;
      if (file) {
        // Image-based search
        const formData = new FormData();
        formData.append("image", file);
        formData.append("query", query);

        response = await axios.post("https://restaurant-finder-vd3m.onrender.com/search-by-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Text-based search
        response = await axios.get("https://restaurant-finder-vd3m.onrender.com/restaurants-by-cuisine", {
          params: { cuisine: query }, // Use `cuisine` instead of `query`
        });
      }

      console.log("Backend Response:", response.data); // Log the response
      if (response.data) {
        setRestaurants(response.data.restaurants || []);
        setSearchTags(response.data.searchTags || []);
        setSuccess(true);
        setPage(1);
      } else {
        setError(response.data.message || "No results found");
      }
    } catch (error) {
      console.error("Error searching:", error);
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(restaurants.length / restaurantsPerPage);
  const startIndex = (page - 1) * restaurantsPerPage;
  const endIndex = startIndex + restaurantsPerPage;
  const currentRestaurants = restaurants.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-green-600">
        Find Restaurants by Food Image or Cuisine
      </h1>

      {/* Search Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Upload a Food Image or Enter a Cuisine
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Take a picture of food you like, or enter a cuisine/dish, and we'll find restaurants that serve it.
          </p>

          {/* Query Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter cuisine or dish (optional)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full text-sm md:text-base"
            />
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="food-image-upload"
            />
            <label
              htmlFor="food-image-upload"
              className="cursor-pointer flex flex-col items-center justify-center gap-2"
            >
              {preview ? (
                <div className="w-full max-w-sm mx-auto">
                  <img
                    src={preview}
                    alt="Food preview"
                    className="h-48 md:h-64 object-contain rounded-md mx-auto"
                  />
                  <p className="text-xs md:text-sm text-gray-500 mt-2">{file?.name}</p>
                  <p className="text-xs text-blue-600 mt-1">Click to change image</p>
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-gray-500 font-medium">
                    Upload a food photo
                  </span>
                  <span className="text-xs text-gray-400">
                    Click to browse or drag an image here
                  </span>
                </>
              )}
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              disabled={(!file && !query) || loading}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                (!file && !query) || loading
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                "Find Restaurants"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm md:text-base">
          {error}
        </div>
      )}

      {success && searchTags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Detected Cuisines:</h2>
          <div className="flex flex-wrap gap-2">
            {searchTags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {success && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            {restaurants.length > 0
              ? `Found ${restaurants.length} restaurants matching your search`
              : "No matching restaurants found"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all text-sm md:text-base"
            >
              Previous
            </button>
            <span className="text-sm md:text-lg font-semibold self-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all text-sm md:text-base"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;