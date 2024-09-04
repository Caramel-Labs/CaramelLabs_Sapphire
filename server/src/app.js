const express = require("express");
const connectDB = require("./config/Database");
const cors = require("cors");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

module.exports = app;
