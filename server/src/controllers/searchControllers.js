const searchService = require("../services/searchService");

class SearchController {
  /**
   * Controller method to handle search requests.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async search(req, res, next) {
    try {
      const query = req.query.q;

      // Validate the query parameter
      if (!query) {
        console.error("Search query parameter is missing.");
        return res.status(400).json({ error: "Query parameter is required" });
      }

      console.log(`Searching for: ${query}`);

      // Call the search service to get results based on the query
      const results = await searchService.search(query);

      console.log(`${results.length} result(s) found for query: ${query}`);

      // Return the search results
      res.json(results);
    } catch (error) {
      console.error(`Error occurred during search: ${error.message}`);
      next(error); // Pass error to the next middleware
    }
  }
}

module.exports = new SearchController();
