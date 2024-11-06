const VisaService = require("../services/visaService");
const VisaAnalyticsService = require("../services/visaAnalyticService");
const { validateImages } = require("../utils/verifications");
const interpolSerchController = require("../controllers/interpolSearchController");
const Visa = require("../models/visaModel");

class VisaController {
  /**
   * Handles the creation of a new visa.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async createVisa(req, res) {
    try {
      const visa = await VisaService.createVisa(req.body);
      res.status(201).json(visa);
    } catch (error) {
      console.error("Error creating visa:", error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Handles updating a visa based on user ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async updateVisa(req, res) {
    try {
      const { userId } = req.params;
      const updatedVisa = await VisaService.updateVisa(userId, req.body);
      if (updatedVisa) {
        res.status(200).json(updatedVisa);
      } else {
        res.status(404).json({ message: "Visa not found" });
      }
    } catch (error) {
      console.error("Error updating visa:", error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Handles retrieving a visa based on user ID.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getVisaByUserId(req, res) {
    try {
      const { userId } = req.params;
      const visa = await VisaService.getVisaByUserId(userId);
      if (visa) {
        res.status(200).json(visa);
      } else {
        res.status(404).json({ message: "Visa not found" });
      }
    } catch (error) {
      console.error("Error retrieving visa:", error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Handles retrieving visas based on query filters.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getFilteredVisas(req, res) {
    try {
      const visas = await VisaService.getFilteredVisas(req.query);
      res.status(200).json(visas);
    } catch (error) {
      console.error("Error filtering visas:", error);
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Handles retrieving all visas with pagination.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  async getAllVisas(req, res) {
    try {
      const { page, limit } = req.query;
      const visas = await VisaService.getAllVisas(page, limit);
      res.status(200).json(visas);
    } catch (error) {
      console.error("Error retrieving all visas:", error);
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Controller to handle the request to generate a new Visa ID
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  async generateVisaId(req, res) {
    try {
      console.log("Received request to generate a new Visa ID");

      // Call the service to generate the Visa ID
      const visaId = await VisaService.generateVisaId();

      console.log(`Visa ID generated successfully: ${visaId}`);

      // Respond with the generated Visa ID
      res.status(200).json({
        success: true,
        visaId: visaId,
      });
    } catch (error) {
      console.error("Error generating Visa ID:", error.message);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
  /**
   * Controller function to retrieve visa statistics by executing multiple service functions in parallel.
   *
   * @param {Object} req - The request object containing query parameters.
   * @param {Object} res - The response object used to send the response.
   */
  async getVisaStatistics(req, res) {
    try {
      const { year, status } = req.query; // Extract year and status from query parameters

      // Log the incoming request details
      console.log(
        `Received request to get visa statistics for year ${year} and status ${status}...`
      );

      // Validate input parameters
      if (!year || !status) {
        return res
          .status(400)
          .json({ error: "Year and status are required parameters." });
      }

      // Execute all service functions in parallel
      const [visaCountsByCountryCode, visaCountsByStatus, visaCountsByMonth] =
        await Promise.all([
          VisaAnalyticsService.getVisaCountsByCountryCode(parseInt(year)), // Ensure year is an integer
          VisaAnalyticsService.getVisaCountsByStatus(parseInt(year), status), // Ensure year is an integer
          VisaAnalyticsService.getVisaCountsByMonth(parseInt(year), status), // Ensure year is an integer
        ]);

      // Log the results of the service functions
      console.log("Visa counts by country code:", visaCountsByCountryCode);
      console.log("Visa counts by status:", visaCountsByStatus);
      console.log("Visa counts by month:", visaCountsByMonth);

      // Send the aggregated results in the response
      res.status(200).json({
        visaCountsByCountryCode,
        visaCountsByStatus,
        visaCountsByMonth,
      });
    } catch (error) {
      console.error("Error retrieving visa statistics:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving visa statistics." });
    }
  }

  async validateVisa(req, res) {
    try {
      const { imageUrl1, imageUrl2, forename, name, nationality, sexId } =
        req.body;

      // Log incoming data
      console.log("Received image URLs:", imageUrl1, imageUrl2);

      // Check if both image URLs are provided
      if (!imageUrl1 || !imageUrl2) {
        return res.status(400).json({ error: "Both image URLs are required" });
      }

      // Call the service to validate the images
      //const validationResponse = await validateImages(imageUrl1, imageUrl2);

      // Handle response based on the boolean result
      // if (!validationResponse.isValid) {
      //   console.log("User details not validated");
      //   return res.status(400).json({ error: "User details not validated" });
      // }

      // If validation is true, perform interpol search
      console.log("User validated, performing interpol search...");
      const result = await interpolSerchController.searchAllNotices(
        forename,
        name,
        nationality,
        sexId
      );

      // Extract notices from the result
      const notices = extractNotices(result);
      console.log("Notices extracted:", notices);

      // Add notices to req.body
      req.body.notices = notices;

      // Now save the visa document with the updated req.body, including notices
      const visa = await VisaService.createVisa(req.body);

      // Respond with the created visa document
      res
        .status(201)
        .json({ message: "Visa created successfully", data: visa });
    } catch (error) {
      console.error("Error in validateVisa controller:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateVisaStatus(req, res) {
    try {
      const { userId } = req.params;
      const { visaStatus } = req.body;

      // Validate that visaStatus is provided
      if (!visaStatus) {
        return res.status(400).json({ message: "Visa status is required." });
      }

      // Validate that visaStatus is one of the allowed values
      const validStatuses = ["approved", "inProgress", "rejected", "expired"];
      if (!validStatuses.includes(visaStatus)) {
        return res.status(400).json({
          message: `Visa status must be one of: ${validStatuses.join(", ")}`,
        });
      }

      // Find the visa document by ID and update its visaStatus
      const updatedVisa = await Visa.findOneAndUpdate(
        { user: userId }, // Query by user ID
        { visaStatus }, // Update visaStatus field
        { new: true } // Return the updated document
      );

      // If the visa document is not found, return a 404 error
      if (!updatedVisa) {
        return res.status(404).json({ message: "Visa document not found." });
      }

      // Respond with the updated visa document
      res.json({
        message: "Visa status updated successfully",
        data: updatedVisa,
      });
    } catch (error) {
      console.error("Error updating visa status:", error);
      res
        .status(500)
        .json({ message: "Server error, failed to update visa status" });
    }
  }
}

const extractNotices = (noticeData) => {
  const notices = [];
  // Helper function to process each type of notice
  const processNotices = (noticeArray, type) => {
    noticeArray.forEach((notice) => {
      notices.push({
        entity_id: notice.entity_id,
        type: type,
      });
    });
  };
  // Process red notices
  if (noticeData.redNotices && noticeData.redNotices.length > 0) {
    processNotices(noticeData.redNotices, "red");
  }
  // Process yellow notices
  if (noticeData.yellowNotices && noticeData.yellowNotices.length > 0) {
    processNotices(noticeData.yellowNotices, "yellow");
  }
  // Process UN notices
  if (noticeData.unNotices && noticeData.unNotices.length > 0) {
    processNotices(noticeData.unNotices, "un");
  }
  return notices;
};

module.exports = new VisaController();
