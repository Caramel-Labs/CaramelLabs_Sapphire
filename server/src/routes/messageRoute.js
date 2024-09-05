const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route("/send").post(messageController.sendMessage);
router
  .route("/:user_id")
  .get(messageController.allMessages)
  .delete(messageController.deleteAllMessages);

module.exports = router;
