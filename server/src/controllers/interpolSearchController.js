const interpolSearchService = require("../services/interpolSearchService");

/**
 * Controller to handle the retrieval of Red Notices.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getRedNotices = async (req, res) => {
  try {
    const notices = await interpolSearchService.getRedNotices();
    res.json(notices);
    console.log("Successfully retrieved Red Notices");
  } catch (error) {
    console.error("Error retrieving Red Notices:", error);
    res.status(500).json({ message: "Failed to retrieve Red Notices" });
  }
};

/**
 * Controller to handle the retrieval of Yellow Notices.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getYellowNotices = async (req, res) => {
  try {
    const notices = await interpolSearchService.getYellowNotices();
    res.json(notices);
    console.log("Successfully retrieved Yellow Notices");
  } catch (error) {
    console.error("Error retrieving Yellow Notices:", error);
    res.status(500).json({ message: "Failed to retrieve Yellow Notices" });
  }
};

/**
 * Controller to handle the retrieval of UN Notices.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUnNotices = async (req, res) => {
  try {
    const notices = await interpolSearchService.getUnNotices();
    res.json(notices);
    console.log("Successfully retrieved UN Notices");
  } catch (error) {
    console.error("Error retrieving UN Notices:", error);
    res.status(500).json({ message: "Failed to retrieve UN Notices" });
  }
};

/**
 * Controller to handle the retrieval of all types of notices (Red, Yellow, UN).
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllNotices = async (req, res) => {
  try {
    const [redNotices, yellowNotices, unNotices] = await Promise.all([
      interpolSearchService.getRedNotices(),
      interpolSearchService.getYellowNotices(),
      interpolSearchService.getUnNotices(),
    ]);

    res.json({ redNotices, yellowNotices, unNotices });
    console.log("Successfully retrieved all notices (Red, Yellow, UN)");
  } catch (error) {
    console.error("Error retrieving all notices:", error);
    res.status(500).json({ message: "Failed to retrieve Notices" });
  }
};

/**
 * Controller to handle the search and retrieval of notices based on forename and name.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const searchNotices = async (req, res) => {
  const { forename, name } = req.query;

  // Validate query parameters
  if (!forename || !name) {
    console.warn("Missing required query parameters: forename or name");
    return res.status(400).json({ message: "Forename and name are required." });
  }

  try {
    // Fetch notices concurrently for better performance
    const [redNotices, yellowNotices, unNotices] = await Promise.all([
      interpolSearchService.getRedNotices(forename, name),
      interpolSearchService.getYellowNotices(forename, name),
      interpolSearchService.getUnNotices(forename, name),
    ]);

    // Consolidate fetched notices
    const notices = {
      redNotices: redNotices._embedded?.notices || [],
      yellowNotices: yellowNotices._embedded?.notices || [],
      unNotices: unNotices._embedded?.notices || [],
    };

    // Process each notice and store the results
    const processedNotices = [];
    const processNotice = async (notice, type) => {
      const noticeId = notice.entity_id.replace("/", "-");
      const noticeWithImages = await interpolSearchService.getNoticeWithImages(
        type,
        noticeId
      );
      processedNotices.push(noticeWithImages);
    };

    // Process all notices concurrently
    await Promise.all([
      ...notices.redNotices.map((notice) => processNotice(notice, "red")),
      ...notices.yellowNotices.map((notice) => processNotice(notice, "yellow")),
      ...notices.unNotices.map((notice) => processNotice(notice, "un")),
    ]);

    // Respond with the processed notices
    res.json(processedNotices);
    console.log(
      "Successfully processed and retrieved notices:",
      processedNotices.length
    );
  } catch (error) {
    console.error("Error processing notices:", error);
    res.status(500).json({ message: "Failed to retrieve and process notices" });
  }
};

module.exports = {
  getRedNotices,
  getYellowNotices,
  getUnNotices,
  getAllNotices,
  searchNotices,
};