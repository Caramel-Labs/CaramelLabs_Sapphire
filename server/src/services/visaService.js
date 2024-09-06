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

  /**
   * Generates a new unique Visa ID in the format 'DNVSL00001'.
   * The ID is auto-incremented based on the last visa document stored in the database.
   *
   * @returns {Promise<string>} - The newly generated Visa ID
   * @throws {Error} - Throws an error if there is an issue generating the Visa ID
   */
  async generateVisaId() {
    try {
      console.log("Starting process to generate new Visa ID...");

      // Fetch the last visa document from the database, sorted by the latest ID (_id) in descending order
      const lastVisa = await Visa.findOne().sort({ _id: -1 });

      let newIdNumber;

      if (lastVisa) {
        // If a visa document is found, extract its visaId
        const lastVisaId = lastVisa.visaId;
        console.log(`Last Visa ID found in database: ${lastVisaId}`);

        // Extract the numeric part of the last Visa ID (ignoring the "DNVSL" prefix)
        const numericPart = parseInt(lastVisaId.substring(5));
        console.log(`Numeric part of last Visa ID: ${numericPart}`);

        // Increment the numeric part to generate the next ID number
        newIdNumber = numericPart + 1;
      } else {
        // If no visa document is found, start with ID number 1
        console.log("No previous Visa ID found, starting from 1.");
        newIdNumber = 1;
      }

      // Construct the new Visa ID, ensuring the numeric part is padded to 5 digits
      const newVisaId = `DNVSL${newIdNumber.toString().padStart(5, "0")}`;
      console.log(`New Visa ID generated: ${newVisaId}`);

      return newVisaId;
    } catch (error) {
      // Log and rethrow any error that occurs during the process
      console.error("Error generating Visa ID:", error.message);
      throw new Error("Error generating Visa ID");
    }
  }
}

module.exports = new VisaService();
