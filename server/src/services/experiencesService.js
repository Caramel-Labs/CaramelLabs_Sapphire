const mongoose = require("mongoose");
const axios = require("axios");
const Experience = require("../models/experienceModel");
const User = require("../models/userModel");
const { getCoordinates, findNearbyHotels } = require("../utils/GoogleAPI");
require("../models/placeModel");

class ExperiencesService {
  /**
   * Retrieves predefined experiences that are not AI-generated
   * @returns {Promise<Array>} List of non-AI-generated experiences
   */
  async PreDefinedExperiences() {
    try {
      console.log("Fetching non-AI generated experiences");
      return await Experience.find({ aiGenerated: false });
    } catch (error) {
      console.error("Error fetching non-AI generated experiences:", error);
      throw new Error("Error fetching non-AI generated experiences");
    }
  }

  /**
   * Finds an experience by its ID
   * @param {String} experienceId - The ID of the experience to retrieve
   * @returns {Promise<Object>} Experience object
   */
  async findExperienceById(experienceId) {
    try {
      console.log(`Fetching experience with ID: ${experienceId}`);
      const experience = await Experience.findById(experienceId).populate(
        "bucketlist"
      );
      if (!experience) {
        console.warn(`Experience not found for ID: ${experienceId}`);
        throw new Error("Experience not found");
      }
      return experience;
    } catch (error) {
      console.error(`Error finding experience by ID: ${error.message}`);
      throw new Error("Error fetching experience");
    }
  }

  /**
   * Retrieves experiences associated with a user
   * @param {String} userId - The ID of the user whose experiences are being retrieved
   * @returns {Promise<Array>} List of user experiences
   */
  async getUserExperiences(userId) {
    try {
      console.log(`Fetching experiences for user with ID: ${userId}`);
      const user = await User.findById(userId).populate("userExperiences");
      if (!user) {
        console.warn(`User not found for ID: ${userId}`);
        throw new Error("User not found");
      }
      return user.userExperiences;
    } catch (error) {
      console.error(`Error fetching user experiences: ${error.message}`);
      throw new Error("Error retrieving user experiences");
    }
  }
}

/**
 * Creates a new experience, converting the address to coordinates,
 * finding nearby hotels, and calling an external endpoint for additional details
 * @param {Object} experienceData - Contains address, name, description, imgUrl, and userId
 * @returns {Promise<Object>} Created experience object
 */
const createExperience = async ({
  address,
  name,
  description,
  imgUrl,
  userId,
}) => {
  try {
    console.log(
      `Creating new experience for user: ${userId} at address: ${address}`
    );

    // Step 1: Convert Address to Coordinates
    const coordinates = await getCoordinates(address);
    console.log(
      `Coordinates for ${address}: ${coordinates.lat}, ${coordinates.lng}`
    );

    // Step 2: Find Nearby Hotels
    const nearbyHotels = await findNearbyHotels(coordinates, 5000); // 5000 meters radius
    console.log(
      `Found ${nearbyHotels.length} nearby hotels for address: ${address}`
    );

    // Step 3: Call an external endpoint for additional details (like cost, duration)
    const furtherActionResponse = await axios.post(
      "https://example.com/another-endpoint", // Replace with actual URL
      { hotels: nearbyHotels }
    );
    console.log(
      "Received response from external endpoint",
      furtherActionResponse.data
    );

    // Step 4: Create the Experience object
    const experience = new Experience({
      name,
      description,
      imgUrl,
      location: {
        type: "Point",
        coordinates: [coordinates.lng, coordinates.lat],
      },
      bucketlist: nearbyHotels.map((hotel) => hotel._id),
      user_id: userId,
      aiGenerated: true,
      duration: furtherActionResponse.data.duration, // Assuming this comes from external API
      cost: furtherActionResponse.data.cost, // Assuming this comes from external API
    });

    // Step 5: Save Experience to the Database
    await experience.save();
    console.log(`Experience created successfully: ${experience._id}`);

    return experience;
  } catch (error) {
    console.error("Error creating experience:", error);
    throw new Error("Error creating experience");
  }
};

module.exports = new ExperiencesService();
