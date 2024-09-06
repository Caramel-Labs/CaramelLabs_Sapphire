const VisaService = require("../services/visaService");
const VisaAnalyticsService = require("../services/visaAnalyticService");

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
}

module.exports = new VisaController();
