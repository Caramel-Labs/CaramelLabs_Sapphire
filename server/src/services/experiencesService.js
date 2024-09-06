const mongoose = require("mongoose");
const axios = require("axios");
const Experience = require("../models/experienceModel");
const User = require("../models/userModel");
const {
  removeInvisibleChars,
  removeInvisibleCharsOfObjectArray,
} = require("../utils/utilities");
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

  /**
   * Creates a new experience, converts the address to coordinates,
   * finds nearby hotels, and calls an external API for additional details.
   * @param {Array} nearbyPlaces - List of nearby places for experience generation
   * @param {String} userId - User ID for whom the experience is being created
   * @returns {Promise<Object>} Created experience object
   */
  async createExperience(nearbyPlaces, userId) {
    try {
      // Step 1: Log the start of the experience creation process
      console.log(`Creating new experience for user: ${userId}`);

      // Step 2: Prepare the nearby places data for external API
      const places = {
        data: nearbyPlaces.map((place) => ({
          name: place.name,
          location: place.location.address,
          description: place.description,
        })),
      };
      const objectIdArray = nearbyPlaces.map((place) => place._id);
      console.log("Nearby places: \n", nearbyPlaces);

      // Step 3: Sanitize the data to remove invisible characters
      const sanitizedJson = await removeInvisibleCharsOfObjectArray(places);
      console.log("This is the input json object :\n", places);

      // Step 4: Call the external intelligence service for AI experience generation
      let response;
      const url = `${process.env.INTELLIGENCE_URL}experience/generate/`;
      console.log(url);
      try {
        response = await axios.post(url, JSON.stringify(sanitizedJson), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log("Error calling Intelligence API");
      }

      // Step 5: Construct the new Experience object using the AI-generated data
      const experience = new Experience({
        name: response.data.experience_title,
        oneliner: response.data.experience_oneliner,
        imgUrl: nearbyPlaces[0]?.imgUrl || "",
        description: response.data.experience_description,
        location: {
          address: response.data.experience_location || "Sri Lanka",
        },
        bucketlist: objectIdArray || [],
        user_id: userId,
        aiGenerated: true,
      });

      // Step 6: Save the new Experience object to the database
      await experience.save();
      console.log(`Experience created successfully: ${experience._id}`);

      // Step 7: Return the created experience object
      return experience;
    } catch (error) {
      // Log the error and rethrow it with a custom message
      console.error("Error creating experience:", error);
      throw new Error("Error creating experience");
    }
  }
}

module.exports = new ExperiencesService();
