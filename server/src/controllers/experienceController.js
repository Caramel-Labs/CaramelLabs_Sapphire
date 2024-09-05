const mongoose = require("mongoose");
const experienceService = require("../services/experiencesService");
const { findNearbyHotelsforExperiences } = require("../utils/GoogleAPI");

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
      const { id } = req.params;

      // Validate if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn(`Invalid Experience ID: ${id}`);
        return res.status(400).json({ error: "Invalid Experience ID" });
      }

      console.log(`Fetching experience with ID: ${id}`);

      // Fetch experience details
      const experience = await experienceService.findExperienceById(id);
      if (!experience) {
        console.warn(`Experience not found for ID: ${id}`);
        return res.status(404).json({ error: "Experience not found" });
      }

      // Fetch nearby hotels for the experience
      const hotels = await findNearbyHotelsforExperiences(id);
      res.status(200).json({ experience, hotels });
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
}

module.exports = new ExperienceController();
