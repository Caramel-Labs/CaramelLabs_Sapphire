const axios = require("axios");

exports.validateImages = async (imageUrl1, imageUrl2) => {
  try {
    // Call the validation API with both image URLs
    const response = await axios.post(
      `${process.env.INTELLIGENCE_URL}visaguard/check-faces/`,
      {
        img1_link: imageUrl1,
        img2_link: imageUrl2,
      }
    );

    // Log the response from the validation API
    console.log("Validation API response:", response.data);

    // Assuming the response contains a boolean field 'isValid'
    return response.data;
  } catch (error) {
    console.error("Error in validateImages service:", error);
    throw error;
  }
};

exports.performInterpolSearch = async () => {
  try {
    // Call the interpol search API or function
    const interpolResponse = await axios.get(
      "http://example.com/interpolSearch"
    );

    // Log the response from interpol search
    console.log("Interpol search response:", interpolResponse.data);

    return interpolResponse.data;
  } catch (error) {
    console.error("Error in performInterpolSearch service:", error);
    throw error;
  }
};
