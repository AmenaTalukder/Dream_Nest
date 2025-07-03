import { useState, useEffect } from "react";
import "../Styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/Listingcard";
import Footer from "../components/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.user.listings);
  console.log(
    "Redux state user.listings:",
    useSelector((state) => state.user.listings)
  );

  const getFeedListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3000/properties?category=${selectedCategory}`
          : "http://localhost:3000/properties",
        { method: "GET" }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      // setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    } finally {
      setLoading(false); // Stop loader after fetch
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      {loading && <Loader />}
      <div className="list">
        {listings?.map(
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
              key={_id}
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
      <Footer />
    </>
  );
};

export default CategoryPage;
