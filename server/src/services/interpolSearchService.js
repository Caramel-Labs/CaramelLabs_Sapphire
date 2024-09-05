const axios = require("axios");

const INTERPOL_API_BASE_URL = "https://ws-public.interpol.int/notices/v1";
const HEADERS = {
  Referer: "https://www.interpol.int/en/How-we-work/Notices/View-Notices",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
};

/**
 * Fetch Red Notices from Interpol API.
 * @param {string} forename - The forename of the person.
 * @param {string} name - The surname of the person.
 * @returns {Promise<Object>} - The Red Notices data.
 */
const getRedNotices = async (forename, name) => {
  try {
    const response = await axios.get(
      `${INTERPOL_API_BASE_URL}/red?forename=${forename}&name=${name}`,
      { headers: HEADERS }
    );

    if (response.data._embedded?.notices) {
      console.log(
        "Red Notices fetched successfully:",
        response.data._embedded.notices
      );
    } else {
      console.log("No Red Notices found.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching Red Notices:", error.message);
    throw new Error("Failed to fetch Red Notices.");
  }
};

/**
 * Fetch Yellow Notices from Interpol API.
 * @param {string} forename - The forename of the person.
 * @param {string} name - The surname of the person.
 * @returns {Promise<Object>} - The Yellow Notices data.
 */
const getYellowNotices = async (forename, name) => {
  try {
    const response = await axios.get(
      `${INTERPOL_API_BASE_URL}/yellow?forename=${forename}&name=${name}`,
      { headers: HEADERS }
    );

    if (response.data._embedded?.notices) {
      console.log(
        "Yellow Notices fetched successfully:",
        response.data._embedded.notices
      );
    } else {
      console.log("No Yellow Notices found.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching Yellow Notices:", error.message);
    throw new Error("Failed to fetch Yellow Notices.");
  }
};

/**
 * Fetch UN Notices from Interpol API.
 * @param {string} forename - The forename of the person.
 * @param {string} name - The surname of the person.
 * @returns {Promise<Object>} - The UN Notices data.
 */
const getUnNotices = async (forename, name) => {
  try {
    const response = await axios.get(
      `${INTERPOL_API_BASE_URL}/un?forename=${forename}&name=${name}`,
      { headers: HEADERS }
    );

    if (response.data._embedded?.notices) {
      console.log(
        "UN Notices fetched successfully:",
        response.data._embedded.notices
      );
    } else {
      console.log("No UN Notices found.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching UN Notices:", error.message);
    throw new Error("Failed to fetch UN Notices.");
  }
};

/**
 * Fetch detailed information of a specific notice by its ID.
 * @param {string} noticeType - The type of the notice (red, yellow, un).
 * @param {string} noticeId - The ID of the notice.
 * @returns {Promise<Object>} - The notice details.
 */
const getNoticeDetails = async (noticeType, noticeId) => {
  try {
    const response = await axios.get(
      `${INTERPOL_API_BASE_URL}/${noticeType}/${noticeId}`,
      { headers: HEADERS }
    );
    console.log(
      `Notice details fetched successfully for ID ${noticeId}:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching notice details for ID ${noticeId}:`,
      error.message
    );
    throw new Error(`Failed to fetch details for notice ID ${noticeId}.`);
  }
};

/**
 * Fetch images associated with a specific notice by its ID.
 * @param {string} noticeType - The type of the notice (red, yellow, un).
 * @param {string} noticeId - The ID of the notice.
 * @returns {Promise<Object>} - The notice images.
 */
const getNoticeImages = async (noticeType, noticeId) => {
  try {
    const response = await axios.get(
      `${INTERPOL_API_BASE_URL}/${noticeType}/${noticeId}/images`,
      { headers: HEADERS }
    );
    console.log(
      `Images fetched successfully for notice ID ${noticeId}:`,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching images for notice ID ${noticeId}:`,
      error.message
    );
    throw new Error(`Failed to fetch images for notice ID ${noticeId}.`);
  }
};

/**
 * Fetch both notice details and images for a specific notice by its ID.
 * @param {string} noticeType - The type of the notice (red, yellow, un).
 * @param {string} noticeId - The ID of the notice.
 * @returns {Promise<Object>} - The notice details and images.
 */
const getNoticeWithImages = async (noticeType, noticeId) => {
  try {
    const [noticeDetails, noticeImages] = await Promise.all([
      getNoticeDetails(noticeType, noticeId),
      getNoticeImages(noticeType, noticeId),
    ]);

    const result = {
      notice: noticeDetails,
      images: noticeImages._embedded?.images || [],
    };

    console.log(
      `Notice with images fetched successfully for ID ${noticeId}:`,
      result
    );
    return result;
  } catch (error) {
    console.error(
      `Error fetching notice and images for ID ${noticeId}:`,
      error.message
    );
    throw new Error(`Failed to fetch notice and images for ID ${noticeId}.`);
  }
};

module.exports = {
  getRedNotices,
  getYellowNotices,
  getUnNotices,
  getNoticeWithImages,
};
