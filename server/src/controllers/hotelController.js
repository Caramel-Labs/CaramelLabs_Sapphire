const hotelService = require("../services/hotelServices");
const { calculateAverageRating } = require("../utils/Calculations");
require("../models/reviewModel");

class HotelController {
  /**
   * Controller method to find hotels by a facility (amenity) name.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findHotelsByAmenityName(req, res, next) {
    try {
      const { amenityName } = req.body;

      // Validate the facility name
      if (!amenityName) {
        return res
          .status(400)
          .json({ error: "facilityName query parameter is required" });
      }

      console.log(
        `Received request to find hotels with facility: ${amenityName}`
      );

      // Call the service to fetch hotels based on the facility name
      const hotels = await hotelService.findHotelsByAmenityName(amenityName);

      console.log(
        `${hotels.length} hotel(s) found for facility: ${amenityName}`
      );
      res.json(hotels);
    } catch (error) {
      console.error(`Error finding hotels by facility: ${error.message}`);
      next(error); // Pass the error to the next middleware
    }
  }

  /**
   * Controller method to get a hotel by its ID, along with the average rating.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getHotelById(req, res, next) {
    try {
      const { hotelId } = req.params;

      // Validate the hotel ID
      if (!hotelId) {
        return res.status(400).json({ error: "Hotel ID is required" });
      }

      console.log(`Received request to fetch hotel by ID: ${hotelId}`);

      // Call the service to fetch the hotel by ID
      const hotel = await hotelService.findHotelById(hotelId);

      console.log(`Hotel found: ${hotel.name}`);

      // Calculate the average rating for the hotel
      const averageRating = calculateAverageRating(hotel.reviews);

      // Return the hotel and the calculated average rating
      res.json({ hotel, averageRating });
    } catch (error) {
      console.error(`Error fetching hotel by ID: ${error.message}`);

      // If the error is specific to the hotel not being found
      if (error.message === "Hotel not found") {
        return res.status(404).json({ error: "Hotel not found" });
      }

      // Pass any other errors to the next middleware
      next(error);
    }
  }
}

module.exports = new HotelController();
