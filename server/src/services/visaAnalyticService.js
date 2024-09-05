const mongoose = require("mongoose");
const Visa = require("../models/visaModel"); // Adjust the path as needed

class VisaAnalytics {
  /**
   * Retrieves the count of visas per countryCode for a given year.
   *
   * @param {number} year - The year for which to retrieve the visa counts.
   * @returns {Promise<Array>} - An array of objects with countryCode and count.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  async getVisaCountsByCountryCode(year) {
    try {
      // Define the start and end dates for the given year
      const startDate = new Date(`${year}-01-01T00:00:00Z`);
      const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);

      console.log(
        `Retrieving visa counts by country code for the year ${year}...`
      );

      // Perform the aggregation query
      const result = await Visa.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate }, // Filter by year
          },
        },
        {
          $group: {
            _id: "$nationality", // Group by countryCode
            count: { $sum: 1 }, // Count occurrences
          },
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            countryCode: "$_id", // Rename _id to countryCode
            count: 1, // Include the count
          },
        },
      ]);

      console.log(`Visa counts by country code for ${year}:`, result);

      return result;
    } catch (error) {
      console.error(
        "Error retrieving visa counts by country code:",
        error.message
      );
      throw new Error("Error retrieving visa counts by country code");
    }
  }
  /**
   * Retrieves the count of accepted and rejected visas for a given year.
   *
   * @param {number} year - The year for which to retrieve the visa counts.
   * @returns {Promise<Object>} - An object with the counts of accepted and rejected visas.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  async getVisaCountsByStatus(year) {
    try {
      // Define the start and end dates for the given year
      const startDate = new Date(`${year}-01-01T00:00:00Z`);
      const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);

      console.log(`Retrieving visa counts by status for the year ${year}...`);

      // Perform the aggregation query
      const result = await Visa.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate }, // Filter by year
          },
        },
        {
          $group: {
            _id: "$visaStatus", // Group by visaStatus
            count: { $sum: 1 }, // Count occurrences
          },
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            visaStatus: "$_id", // Rename _id to visaStatus
            count: 1, // Include the count
          },
        },
      ]);

      // Initialize counts
      let acceptedVisaCount = 0;
      let rejectedVisaCount = 0;

      // Process the results
      result.forEach((status) => {
        if (status.visaStatus === "valid") {
          acceptedVisaCount = status.count;
        } else if (status.visaStatus === "rejected") {
          rejectedVisaCount = status.count;
        }
      });

      // Create the final result object
      const visaCounts = {
        acceptedVisaCount,
        rejectedVisaCount,
      };

      console.log(`Visa counts for ${year}:`, visaCounts);

      return visaCounts;
    } catch (error) {
      console.error("Error retrieving visa counts by status:", error.message);
      throw new Error("Error retrieving visa counts by status");
    }
  }
  /**
   * Retrieves the count of visas per month for a given year and status.
   *
   * @param {number} year - The year for which to retrieve the visa counts.
   * @param {string} status - The visa status to filter by (e.g., 'valid', 'rejected').
   * @returns {Promise<Array>} - An array of objects with month and count.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  async getVisaCountsByMonth(year, status) {
    try {
      // Define the start and end dates for the given year
      const startDate = new Date(`${year}-01-01T00:00:00Z`);
      const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);

      console.log(
        `Retrieving visa counts by month for the year ${year} and status ${status}...`
      );

      // Perform the aggregation query
      const result = await Visa.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lt: endDate }, // Filter by year
            visaStatus: status, // Filter by status
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" }, // Extract the month from createdAt
          },
        },
        {
          $group: {
            _id: "$month", // Group by month
            count: { $sum: 1 }, // Count occurrences
          },
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            month: "$_id", // Rename _id to month
            count: 1, // Include the count
          },
        },
        {
          $sort: { month: 1 }, // Sort by month
        },
      ]);

      // Format the result
      const visaCounts = result.map((entry) => ({
        month: entry.month,
        count: entry.count,
      }));

      console.log(
        `Visa counts by month for ${year} and status ${status}:`,
        visaCounts
      );

      return visaCounts;
    } catch (error) {
      console.error("Error retrieving visa counts by month:", error.message);
      throw new Error("Error retrieving visa counts by month");
    }
  }
}
module.exports = new VisaAnalytics();
