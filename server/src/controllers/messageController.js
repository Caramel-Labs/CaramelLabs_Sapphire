const asyncHandler = require("express-async-handler");
const chatService = require("../services/messageService");

class MessageController {
  /**
   * @description Get all Messages for a specific user
   * @route GET /api/messages/:user_id
   * @access Protected
   */
  allMessages = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    try {
      // Fetch all messages for the given user_id
      const messages = await chatService.getAllMessages(user_id);

      // Return the fetched messages in the response
      res.json(messages);
    } catch (error) {
      console.error(
        `Error fetching messages for user ${user_id}: ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Failed to fetch messages. Please try again." });
    }
  });

  /**
   * @description Delete all Messages of a specific user
   * @route DELETE /api/messages/:user_id
   * @access Protected
   */
  deleteAllMessages = asyncHandler(async (req, res) => {
    const { user_id } = req.params;

    try {
      // Attempt to delete all messages for the user
      const result = await chatService.deleteAllMessages(user_id);

      // Send appropriate response based on the result of deletion
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(
        `Error deleting messages for user ${user_id}: ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Failed to delete messages. Please try again." });
    }
  });

  /**
   * @description Send a new message and get bot response
   * @route POST /api/messages/send
   * @access Protected
   */
  sendMessage = asyncHandler(async (req, res) => {
    const { user_id, message: userMessage } = req.body;

    try {
      // Ensure both user_id and message are provided
      if (!user_id || !userMessage) {
        return res
          .status(400)
          .json({ error: "User ID and message are required." });
      }

      // Create a new message and get the bot's response
      const responseObject = await chatService.createMessageAndRespond(
        user_id,
        userMessage
      );

      // Send the response object (bot's message) in the response
      res.status(200).json(responseObject);
    } catch (error) {
      console.error(
        `Error sending message for user ${user_id}: ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Failed to send message. Please try again." });
    }
  });
}

module.exports = new MessageController();
