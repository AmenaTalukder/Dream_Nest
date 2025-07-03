const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  createListing,
  getListings,
  searchListings,
  getListingById
} = require("../controllers/listingController");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage });

// Routes
router.post("/create", upload.array("listingPhotos"), createListing);
router.get("/", getListings);
router.get("/search/:search", searchListings);
router.get("/:listingId", getListingById);

module.exports = router;
