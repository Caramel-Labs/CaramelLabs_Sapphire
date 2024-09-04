const Visa = require("../models/visaModel");

class VisaService {
  /**
   * Creates a new visa record.
   * @param {Object} visaData - The data for the new visa.
   * @returns {Object} - The created visa document.
   */
  async createVisa(visaData) {
    console.log("Creating a new visa with data:", visaData);
    const visa = new Visa(visaData);
    const savedVisa = await visa.save();
    console.log("New visa created successfully:", savedVisa);
    return savedVisa;
  }

  /**
   * Updates a visa record based on the user ID.
   * @param {String} userId - The ID of the user whose visa is to be updated.
   * @param {Object} updateData - The data to update the visa with.
   * @returns {Object} - The updated visa document.
   */
  async updateVisa(userId, updateData) {
    console.log(`Updating visa for user ID: ${userId} with data:`, updateData);
    const updatedVisa = await Visa.findOneAndUpdate(
      { user: userId },
      updateData,
      {
        new: true,
      }
    );
    console.log("Visa updated successfully:", updatedVisa);
    return updatedVisa;
  }

  /**
   * Retrieves a visa record based on the user ID.
   * @param {String} userId - The ID of the user whose visa is to be retrieved.
   * @returns {Object} - The retrieved visa document.
   */
  async getVisaByUserId(userId) {
    console.log(`Fetching visa for user ID: ${userId}`);
    const visa = await Visa.findOne({ user: userId });
    console.log("Visa retrieved successfully:", visa);
    return visa;
  }

  /**
   * Retrieves visas based on the provided filter criteria.
   * @param {Object} query - The query parameters to filter visas.
   * @returns {Array} - An array of visa documents matching the filter criteria.
   */
  async getFilteredVisas(query) {
    const filter = {};

    // Building the filter object based on the query parameters
    if (query.visaStatus) filter.visaStatus = query.visaStatus;
    if (query.nationality) filter.nationality = query.nationality;
    if (query.gender) filter.gender = query.gender;

    console.log("Filtering visas with criteria:", filter);
    const filteredVisas = await Visa.find(filter);
    console.log("Visas filtered successfully:", filteredVisas);
    return filteredVisas;
  }

  /**
   * Retrieves all visas with pagination.
   * @param {Number} page - The page number to retrieve.
   * @param {Number} limit - The number of visas to retrieve per page.
   * @returns {Object} - An object containing the paginated visa documents.
   */
  async getAllVisas(page, limit) {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: { createdAt: -1 }, // Sort by creation date descending
    };

    console.log(
      `Fetching all visas with pagination: page=${options.page}, limit=${options.limit}`
    );
    const visas = await Visa.paginate({}, options);
    console.log("Visas retrieved with pagination successfully:", visas);
    return visas;
  }
}

module.exports = new VisaService();
