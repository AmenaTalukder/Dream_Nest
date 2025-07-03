const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

// Imports routes
const authRoutes = require("./routes/authentication.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Route Configaration
app.use("/authentication", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// MongoDB Connection
const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "DreamNestTravelBooking",
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`MongoDB connected Successfully On Port :${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
