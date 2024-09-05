const express = require("express");
const hotelController = require("../controllers/hotelController");
const Hotel = require("../models/hotelModel");
require("../models/reviewModel");

const router = express.Router();

router.post("/", hotelController.findHotelsByAmenityName);
// Route to get all places
router.get("/all", async (req, res, next) => {
  try {
    const places = await Hotel.find().populate("reviews");
    res.json(places);
  } catch (error) {
    next(error);
  }
});
router.get("/:hotelId", hotelController.getHotelById);

module.exports = router;
