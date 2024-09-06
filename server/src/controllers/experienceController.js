const mongoose = require("mongoose");
const experienceService = require("../services/experiencesService");
const userServices = require("../services/userServices");
const {
  findNearbyPlaces,
  findNearbyHotelsByCoordinates,
} = require("../utils/GoogleAPI");

class ExperienceController {
  /**
   * Retrieves all predefined (non-AI-generated) experiences
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async PreDefinedExperiences(req, res) {
    try {
      console.log("Fetching predefined experiences");
      const experiences = await experienceService.PreDefinedExperiences();
      res.status(200).json(experiences);
    } catch (error) {
      console.error("Error fetching predefined experiences:", error.message);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  }

  /**
   * Retrieves a single experience by its ID and finds nearby hotels for that experience
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async getExperienceById(req, res, next) {
    try {
      const { experienceId, userId } = req.query;

      // Validate if the provided ID is a valid MongoDB ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(experienceId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        console.warn(
          `Invalid Experience ID: ${experienceId} or USER ID: ${userId}`
        );
        return res.status(400).json({ error: "Invalid Experience or USER ID" });
      }

      console.log(
        `Fetching experience with ID: ${experienceId} and user ID: ${userId}`
      );

      // Fetch experience details
      const experience = await experienceService.findExperienceById(
        experienceId
      );

      // Fetch user details
      const user = await userServices.getUserById(userId);

      if (!experience || !user) {
        console.warn(
          `Experience or user not found for ID: ${experienceId} or ${userId}`
        );
        return res.status(404).json({ error: "Experience or User not found" });
      }

      const bucketList = experience.bucketlist;
      const userVisitedPlaces = user.userVisitedPlaces;

      // Loop through the bucket list and add the isVisited field
      const updatedBucketList = bucketList.map((place) => {
        return {
          ...place._doc, // Spread the original place object
          isVisited: userVisitedPlaces.includes(place._id.toString()), // Check if the place ID exists in userVisitedPlaces
        };
      });

      // Remove the bucketlist from the experience object
      const { bucketlist, ...experienceWithoutBucketlist } = experience._doc;

      // Send response with the updated experience and updated bucket list
      res
        .status(200)
        .json({ experience: experienceWithoutBucketlist, updatedBucketList });
    } catch (error) {
      console.error(`Error fetching experience by ID: ${error.message}`);
      next(error); // Pass error to global error handler
    }
  }

  /**
   * Retrieves experiences for a specific user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getUserExperiences(req, res) {
    try {
      const { userId } = req.params;

      console.log(`Fetching experiences for user with ID: ${userId}`);

      // Fetch user experiences
      const experiences = await experienceService.getUserExperiences(userId);

      // Return experiences in reverse order (e.g., latest experiences first)
      res.status(200).json(experiences.reverse());
    } catch (error) {
      console.error(`Error fetching user experiences: ${error.message}`);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Generate AI-powered experiences for a specific user based on location
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createAIexperience(req, res) {
    try {
      // Destructure longitude, latitude, and userId from the request body
      const { longitude, latitude, userId } = req.body;

      // Validate required fields
      if (!longitude || !latitude || !userId) {
        console.error(
          "Missing required fields: longitude, latitude, or userId"
        );
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Fetch nearby places based on user's current location
      const [nearbyPlaces, nearbyHotels] = await Promise.all([
        findNearbyPlaces(longitude, latitude),
        findNearbyHotelsByCoordinates(longitude, latitude),
      ]);

      if (!nearbyPlaces.length) {
        console.warn("No nearby places found");
        return res.status(404).json({ message: "No nearby places found" });
      }

      // Generate AI-based experience suggestions using the nearby places
      const aiExperience = await experienceService.createExperience(
        nearbyPlaces,
        userId
      );

      if (!aiExperience) {
        console.warn("AI experience generation failed");
        return res
          .status(500)
          .json({ error: "Failed to generate AI experiences" });
      }

      // Log the nearby places and generated experiences for debugging
      console.log("Nearby Places:", nearbyPlaces);
      console.log("Generated AI Experience:", aiExperience);

      // Send successful response with the generated AI experiences
      return res.status(200).json({ aiExperience, nearbyHotels });
    } catch (error) {
      // Catch any unexpected errors and return a 500 status
      console.error("Error generating AI experience:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new ExperienceController();
