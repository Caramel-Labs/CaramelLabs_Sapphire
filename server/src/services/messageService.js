const Message = require("../models/messageModel");
const axios = require("axios");

class MessageService {
  /**
   * Retrieve all messages for a given user.
   * @param {string} user_id - The ID of the user whose messages are to be retrieved.
   * @returns {Promise<Array>} - A promise that resolves to an array of messages.
   */
  getAllMessages = async (user_id) => {
    try {
      console.log(`Fetching all messages for user: ${user_id}`);
      const messages = await Message.find({ user: user_id });
      console.log(`Found ${messages.length} message(s) for user: ${user_id}`);
      return messages;
    } catch (error) {
      console.error(
        `Error fetching messages for user ${user_id}: ${error.message}`
      );
      throw new Error("Error fetching messages: " + error.message);
    }
  };

  /**
   * Delete all messages for a given user.
   * @param {string} user_id - The ID of the user whose messages are to be deleted.
   * @returns {Promise<Object>} - A promise that resolves to a status object indicating the result.
   */
  deleteAllMessages = async (user_id) => {
    try {
      console.log(`Deleting all messages for user: ${user_id}`);
      const deletedMessages = await Message.deleteMany({ user: user_id });

      if (deletedMessages.deletedCount > 0) {
        console.log(
          `Successfully deleted ${deletedMessages.deletedCount} message(s) for user: ${user_id}`
        );
        return {
          status: 200,
          message: "Successfully deleted all messages for user",
        };
      } else {
        console.log(`No messages found for user: ${user_id}`);
        return {
          status: 404,
          message: "No messages found for user",
        };
      }
    } catch (error) {
      console.error(
        `Error deleting messages for user ${user_id}: ${error.message}`
      );
      throw new Error("Error deleting messages: " + error.message);
    }
  };

  /**
   * Create a new message from the user, send it to an external API,
   * receive a response, and save both user and bot messages to the database.
   * @param {string} user_id - The ID of the user.
   * @param {string} userMessage - The message content from the user.
   * @returns {Promise<Object>} - A promise that resolves to the bot's response.
   */
  createMessageAndRespond = async (user_id, userMessage) => {
    try {
      console.log(`Creating user message for user: ${user_id}`);

      // Prepare user message for saving
      const userMessageObj = new Message({
        isbot: false,
        content: userMessage,
        user: user_id,
      });

      // Prepare the input JSON for the external API call
      const inputJson = {
        content: userMessage,
        username: user_id,
      };
      const sanitizedJson = this.removeInvisibleChars(inputJson);
      console.log(`Sending message to external API for user: ${user_id}`);

      // Simultaneously save user message and call external API
      const [savedUserMessage, apiResponse] = await Promise.all([
        userMessageObj.save(),
        axios.post(
          "https://loop-chatbot-caramel-labs.koyeb.app/chat-with-memory/",
          sanitizedJson,
          { headers: { "Content-Type": "application/json" } }
        ),
      ]);

      const responseText = apiResponse.data.response;
      console.log(`Received response from API: ${responseText}`);

      // Prepare bot message for saving
      const botMessageObj = new Message({
        isbot: true,
        content: responseText,
        user: user_id,
      });

      // Save bot message
      await botMessageObj.save();
      console.log(`Saved bot response message for user: ${user_id}`);

      return { responseText };
    } catch (error) {
      console.error(
        `Error creating message and responding for user ${user_id}: ${error.message}`
      );
      throw new Error(
        "Error creating message and responding: " + error.message
      );
    }
  };

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
}

module.exports = new MessageService();
