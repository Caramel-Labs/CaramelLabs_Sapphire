const express = require("express");
const connectDB = require("./config/Database");
const cors = require("cors");

const visaRoutes = require("./routes/visaRoutes");
const interpolRoutes = require("./routes/interpolsearchroutes");

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Set up routes
app.use("/api/visa", visaRoutes);
app.use("/api/interpol", interpolRoutes);

module.exports = app;
