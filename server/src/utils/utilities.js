/**
 * Utility function to remove invisible characters from JSON object strings.
 * @param {Object} obj - The object containing strings to sanitize.
 * @returns {Object} - The sanitized object with invisible characters removed.
 */
removeInvisibleChars = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  for (const key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].replace(/[^\x20-\x7E]/g, "");
    } else if (typeof obj[key] === "object") {
      obj[key] = this.removeInvisibleChars(obj[key]);
    }
  }

  return obj;
};
/**
 * Removes invisible characters from all string properties in an object array.
 * Recursively processes nested objects and arrays.
 * @param {Object} obj - Object containing an array of data
 * @returns {Object} Sanitized object with invisible characters removed
 */
const removeInvisibleCharsOfObjectArray = (obj) => {
  // Ensure the input is an object
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Iterate through the object's keys
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      // Remove invisible characters from strings
      obj[key] = obj[key].replace(/[^\x20-\x7E]/g, "");
    } else if (Array.isArray(obj[key])) {
      // Recursively handle arrays
      obj[key] = obj[key].map(removeInvisibleChars);
    } else if (typeof obj[key] === "object") {
      // Recursively handle nested objects
      obj[key] = removeInvisibleChars(obj[key]);
    }
  }

  return obj;
};
module.exports = { removeInvisibleChars, removeInvisibleCharsOfObjectArray };
