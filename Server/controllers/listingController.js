const Listing = require("../models/UserListing");
const User = require("../models/UserModel");

// CREATE LISTING
exports.createListing = async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) return res.status(400).send("No file uploaded.");

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price
    });

    await newListing.save();
    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
  }
};

// GET LISTINGS BY CATEGORY
exports.getListings = async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
};

// SEARCH LISTINGS
exports.searchListings = async (req, res) => {
  const { search } = req.params;
  try {
    const listings =
      search === "all"
        ? await Listing.find().populate("creator")
        : await Listing.find({
            $or: [
              { category: { $regex: search, $options: "i" } },
              { title: { $regex: search, $options: "i" } }
            ]
          }).populate("creator");

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
};

// GET LISTING DETAILS
exports.getListingById = async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId).populate("creator");
    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found!", error: err.message });
  }
};
