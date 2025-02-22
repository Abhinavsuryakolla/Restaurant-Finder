import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestaurantList from "./pages/RestaurantList";
import SearchPage from "./pages/SearchPage";
import ImageSearch from "./pages/ImageSearch";
import RestaurantDetail from "./pages/RestaurantDetail";
import Navbar from "./components/Navbar";
import RestaurantLocation from "./pages/LocationSearchResults";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/image-search" element={<ImageSearch />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/location" element={<RestaurantLocation />} />
      </Routes>
    </Router>
  );
};

export default App;