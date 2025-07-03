import { useEffect, useState } from "react";
import { categories } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import "../Styles/Listings.scss";
import ListingCard from "./Listingcard";
import Loader from "./Loader";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const url =
        selectedCategory !== "All"
          ? `http://localhost:3000/properties?category=${selectedCategory}`
          : "http://localhost:3000/properties";

      console.log("Fetching listings from URL:", url);

      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      console.log("Fetched listings data:", data);

      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${
              category.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
