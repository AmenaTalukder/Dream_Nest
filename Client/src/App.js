import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Main.jsx";
import RegisterPage from "./pages/Registerpage.jsx";
import LoginPage from "./pages/LoginPages.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import ListingDetails from "./pages/ListingDetails";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/properties/:listingId" element={<ListingDetails />} />
        <Route
          path="/properties/category/:category"
          element={<CategoryPage />}
        />
        <Route path="/properties/search/:search" element={<SearchPage />} />
        <Route path="/:userId/trips" element={<TripList />} />
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<PropertyList />} />
        <Route path="/:userId/reservations" element={<ReservationList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
