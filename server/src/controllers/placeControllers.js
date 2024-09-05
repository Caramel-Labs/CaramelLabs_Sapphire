const placeService = require("../services/placeService");
const { findNearbyHotels } = require("../utils/GoogleAPI");
const { calculateAverageRating } = require("../utils/Calculations");
require("dotenv").config();

class TravelPlaceController {
  /**
   * Finds places based on interest IDs provided in the request body
   * @param {Object} req - Express request object containing interestIds in the body
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function for error handling
   */
  async findPlacesByInterests(req, res, next) {
    try {
      const { interestIds } = req.body;

      // Validate interestIds input
      if (!interestIds || !Array.isArray(interestIds)) {
        console.warn("Invalid interestIds format");
        return res.status(400).json({ error: "interestIds must be an array" });
      }

      console.log(`Finding places for interests: ${interestIds}`);

      // Fetch places matching interestIds
      const places = await placeService.findPlacesByInterests(interestIds);

      console.log(`Found ${places.length} places matching interests`);
      res.json(places);
    } catch (error) {
      console.error(`Error finding places by interests: ${error.message}`);
      next(error);
    }
  }

  /**
   * Retrieves place details by placeId, including nearby hotels and average rating
   * @param {Object} req - Express request object containing placeId in params
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function for error handling
   */
  async getPlaceById(req, res, next) {
    try {
      const { placeId } = req.params;

      console.log(`Retrieving details for place ID: ${placeId}`);

      // Fetch the place by its ID
      const place = await placeService.findPlaceById(placeId);
      if (!place) {
        console.warn(`Place with ID ${placeId} not found`);
        return res.status(404).json({ error: "Place not found" });
      }

      // Find nearby hotels using Google Maps API utility
      const hotels = await findNearbyHotels(place._id);
      console.log(`Found ${hotels.length} nearby hotels for place ${placeId}`);

      // Calculate average rating from place's reviews
      const averageRating = calculateAverageRating(place.reviews);
      console.log(`Average rating for place ${placeId}: ${averageRating}`);

      // Send place details, nearby hotels, and average rating in response
      res.json({ place, hotels, averageRating });
    } catch (error) {
      console.error(`Error retrieving place by ID: ${error.message}`);
      next(error);
    }
  }
}

module.exports = new TravelPlaceController();
