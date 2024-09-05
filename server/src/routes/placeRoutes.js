const express = require("express");
const travelController = require("../controllers/placeControllers");
const Places = require("../models/placeModel");

const router = express.Router();

// Route to find places by interests
router.post("/", travelController.findPlacesByInterests);

// Route to get all places
router.get("/all", async (req, res, next) => {
  try {
    const places = await Places.find();
    res.json(places);
  } catch (error) {
    next(error);
  }
});

// Route to get a place by ID
router.get("/:placeId", travelController.getPlaceById);

module.exports = router;
