const Place = require("../models/placeModel");
const mongoose = require("mongoose");
require("../models/reviewModel");

class TravelPlacesService {
  /**
   * Finds places based on the provided interest IDs and sorts them by the number of matching interests
   * @param {Array} interestIds - Array of interest IDs to filter places
   * @returns {Array} - Sorted array of places based on the number of matching interests
   */
  async findPlacesByInterests(interestIds) {
    console.log(`Finding places for interest IDs: ${interestIds}`);

    try {
      // Convert interestIds to ObjectId for MongoDB query
      const jsoninterestIds = interestIds.map(
        (id) => new mongoose.Types.ObjectId(id)
      );

      // Find places where at least one interest matches the provided interest IDs
      const places = await Place.find({
        interests: { $in: jsoninterestIds },
      });

      console.log(
        `Found ${places.length} places with at least one matching interest`
      );

      // Calculate the number of matching interestIds for each place
      places.forEach((place) => {
        place.matchCount = place.interests.filter((id) =>
          jsoninterestIds.some((interestId) => interestId.equals(id))
        ).length;
      });

      // Sort places by matchCount in descending order (more matches first)
      places.sort((a, b) => b.matchCount - a.matchCount);

      console.log(
        `Places sorted by match count: ${places.map(
          (place) => `${place._id}: ${place.matchCount}`
        )}`
      );

      // Clean up: Remove matchCount from the final output
      places.forEach((place) => {
        delete place.matchCount;
      });

      return places;
    } catch (error) {
      console.error(`Error finding places by interests: ${error.message}`);
      throw new Error("Failed to find places by interests");
    }
  }

  /**
   * Finds a place by its ID and populates its reviews with comment and rating
   * @param {String} placeId - ID of the place to find
   * @returns {Object} - The place with populated reviews
   */
  async findPlaceById(placeId) {
    console.log(`Finding place with ID: ${placeId}`);

    try {
      // Find the place by ID and populate its reviews
      const place = await Place.findById(placeId).populate(
        "reviews",
        "comment rating"
      );

      if (!place) {
        console.warn(`Place with ID ${placeId} not found`);
        throw new Error("Place not found");
      }

      console.log(`Found place: ${place.name}`);
      return place;
    } catch (error) {
      console.error(`Error finding place by ID: ${error.message}`);
      throw new Error("Failed to find place by ID");
    }
  }
}

module.exports = new TravelPlacesService();
