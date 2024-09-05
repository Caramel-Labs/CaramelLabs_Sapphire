const express = require("express");
const connectDB = require("./config/Database");
const cors = require("cors");

const visaRoutes = require("./routes/visaRoutes");
const interpolRoutes = require("./routes/interpolsearchroutes");
const paymentRoutes = require("./routes/paymentroutes");

const placeRoutes = require("./routes/placeRoutes");
const experienceroutes = require("./routes/experienceroutes");
const hotelRoutes = require("./routes/hotelRoutes");
const searchRoute = require("../src/routes/searchRoute");
const chatRoute = require("../src/routes/messageRoute");
const emailRoute = require("../src/routes/emailRoute");

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Set up routes
app.use("/api/visa", visaRoutes);
app.use("/api/interpol", interpolRoutes);
app.use("/api/payment", paymentRoutes);

app.use("/api/places", placeRoutes);
app.use("/api/experiences", experienceroutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/search", searchRoute);
app.use("/api/chat", chatRoute);
app.use("/api/email", emailRoute);

module.exports = app;
