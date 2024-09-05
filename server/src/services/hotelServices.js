const Hotel = require("../models/hotelModel");
const Amenity = require("../models/amenityModel");

class HotelService {
  /**
   * Finds hotels by a given amenity name.
   * @param {string} amenityName - The name of the amenity (e.g., "Wi-Fi", "Pool").
   * @returns {Array} - A list of hotels that offer the specified amenity.
   */
  async findHotelsByAmenityName(amenityName) {
    console.log(`Searching for hotels with the amenity: ${amenityName}`);

    // Find facilities matching the provided amenity name
    const amenities = await Amenity.find({ name: amenityName });

    if (amenities.length === 0) {
      console.log(`No amenities found with the name: ${amenityName}`);
      return [];
    }

    // Map the amenities to their respective IDs
    const amenityIds = amenities.map((amenity) => amenity._id);

    // Find hotels that offer any of the amenities from the list
    const hotels = await Hotel.find({
      amenities: { $in: amenityIds },
    })
      .select("imgUrl name location cost description")
      .lean();

    console.log(
      `${hotels.length} hotel(s) found with the amenity: ${amenityName}`
    );

    return hotels;
  }

  /**
   * Finds a hotel by its ID and includes reviews.
   * @param {string} hotelId - The ID of the hotel to find.
   * @returns {Object} - The hotel details with reviews.
   * @throws {Error} - If the hotel is not found.
   */
  async findHotelById(hotelId) {
    console.log(`Fetching hotel with ID: ${hotelId}`);

    // Find the hotel by ID and populate reviews
    const hotel = await Hotel.findById(hotelId).populate("reviews").lean();

    if (!hotel) {
      console.error(`Hotel not found with ID: ${hotelId}`);
      throw new Error("Hotel not found");
    }

    console.log(`Hotel found: ${hotel.name}`);
    return hotel;
  }
}

module.exports = new HotelService();
