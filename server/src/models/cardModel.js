const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  nameOnCard: String,
  number: { type: String, required: true },
  expiry: String,
  cvc: String,
  type: String,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Card", cardSchema);
