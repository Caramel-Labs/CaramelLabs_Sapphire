const axios = require("axios");
const Place = require("../models/placeModel");
const Experience = require("../models/experienceModel");
const Hotel = require("../models/hotelModel");

/**
 * Fetches the geographical coordinates (latitude and longitude) of a given place
 * using the Google Geocoding API.
 * @param {String} placeName - Name of the place to retrieve coordinates for.
 * @returns {Object} - An object containing latitude and longitude of the place.
 */
const getCoordinates = async (placeName) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      placeName
    )}&key=${apiKey}`;

    console.log(`Fetching coordinates for place: ${placeName}`);
    const response = await axios.get(url);

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      console.log(`Coordinates found: ${location.lat}, ${location.lng}`);
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.warn(`No location found for: ${placeName}`);
      throw new Error("Location not found");
    }
  } catch (error) {
    console.error(`Error fetching coordinates: ${error.message}`);
    throw new Error("Failed to get coordinates");
  }
};

/**
 * Finds nearby hotels within a 5 km radius of a given place using MongoDB geospatial queries.
 * @param {String} placeId - ID of the place to find nearby hotels.
 * @returns {Array} - List of nearby hotels.
 */
const findNearbyHotels = async (placeId) => {
  try {
    const place = await Place.findById(placeId).lean();
    if (!place || !place.location)
      throw new Error("Place not found or location is missing");

    console.log(`Finding nearby hotels for place ID: ${placeId}`);
    const nearbyHotels = await Hotel.find({
      location: {
        $near: {
          $geometry: place.location,
          $maxDistance: 5000, // Distance in meters (5 km)
        },
      },
    });

    console.log(
      `Found ${nearbyHotels.length} hotels near place ID: ${placeId}`
    );
    return nearbyHotels;
  } catch (error) {
    console.error(`Error finding nearby hotels: ${error.message}`);
    throw new Error("Failed to find nearby hotels");
  }
};

/**
 * Finds nearby hotels within a 5 km radius of a given experience using MongoDB geospatial queries.
 * @param {String} experienceId - ID of the experience to find nearby hotels.
 * @returns {Array} - List of nearby hotels.
 */
const findNearbyHotelsforExperiences = async (experienceId) => {
  try {
    const experience = await Experience.findById(experienceId).lean();
    if (!experience || !experience.location)
      throw new Error("Experience not found or location is missing");

    console.log(`Finding nearby hotels for experience ID: ${experienceId}`);
    const nearbyHotels = await Hotel.find({
      location: {
        $near: {
          $geometry: experience.location,
          $maxDistance: 5000, // Distance in meters (5 km)
        },
      },
    });

    console.log(
      `Found ${nearbyHotels.length} hotels near experience ID: ${experienceId}`
    );
    return nearbyHotels;
  } catch (error) {
    console.error(`Error finding nearby hotels: ${error.message}`);
    throw new Error("Failed to find nearby hotels");
  }
};

/**
 * Finds nearby Places within a 10 km radius of a given experience using MongoDB geospatial queries.
 * @param {coordinates} longitude
 * @param {coordinates} latitude
 * @returns {Array} - List of nearby Places.
 */
const findNearbyPlaces = async (longitude, latitude) => {
  try {
    if (!longitude || !latitude) {
      throw new Error("Longitude and latitude are required");
    }

    console.log(
      `Finding nearby places for coordinates: [${longitude}, ${latitude}]`
    );

    const nearbyPlaces = await Place.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, // Distance in meters (10 km)
        },
      },
    }).lean(); // Optional: Use `lean()` to get plain JavaScript objects

    console.log(
      `Found ${nearbyPlaces.length} places near the given coordinates`
    );

    // console.log(places);
    return nearbyPlaces;
  } catch (error) {
    console.error(`Error finding nearby places: ${error.message}`);
    throw new Error("Failed to find nearby places");
  }
};

/**
 * Finds nearby Places within a 10 km radius of a given experience using MongoDB geospatial queries.
 * @param {coordinates} longitude
 * @param {coordinates} latitude
 * @returns {Array} - List of nearby Places.
 */
const findNearbyHotelsByCoordinates = async (longitude, latitude) => {
  try {
    if (!longitude || !latitude) {
      throw new Error("Longitude and latitude are required");
    }

    console.log(
      `Finding nearby places for coordinates: [${longitude}, ${latitude}]`
    );

    const nearbyHotels = await Hotel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000, // Distance in meters (10 km)
        },
      },
    }).lean();

    console.log(
      `Found ${nearbyHotels.length} Hotels near the given coordinates`
    );

    // console.log(places);
    return nearbyHotels;
  } catch (error) {
    console.error(`Error finding nearby places: ${error.message}`);
    throw new Error("Failed to find nearby places");
  }
};

/**
 * Fetches the formatted address of a given place by using its coordinates (longitude, latitude).
 * Uses the Google Geocoding API to convert coordinates into an address.
 * @param {String} placeId - ID of the place to retrieve the address for.
 * @returns {String} - The formatted address of the place.
 */
const getAddressFromCoordinates = async (placeId) => {
  try {
    const place = await Place.findById(placeId).lean();
    if (!place || !place.location)
      throw new Error("Place not found or location is missing");

    const [longitude, latitude] = place.location.coordinates;
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    console.log(
      `Fetching address for coordinates: lat=${latitude}, lng=${longitude}`
    );
    const response = await axios.get(url);

    if (response.data.results.length > 0) {
      const address = response.data.results[0].formatted_address;
      console.log(`Address found: ${address}`);
      return address;
    } else {
      console.warn(`No address found for place ID: ${placeId}`);
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error(`Error fetching address: ${error.message}`);
    throw new Error("Failed to get address from coordinates");
  }
};

module.exports = {
  getCoordinates,
  findNearbyHotels,
  getAddressFromCoordinates,
  findNearbyHotelsforExperiences,
  findNearbyPlaces,
  findNearbyHotelsByCoordinates,
};
