const VisaService = require("../services/visaService");

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
}

module.exports = new VisaController();
