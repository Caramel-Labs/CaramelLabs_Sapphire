const mongoose = require("mongoose");

const MessegeSchema = new mongoose.Schema(
  {
    isbot: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessegeSchema);

module.exports = { MessageModel };
