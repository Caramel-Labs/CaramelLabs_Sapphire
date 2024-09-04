const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Sapphirepoints: Number,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
  interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
  userExperiences: [{ type: Schema.Types.ObjectId, ref: "Experiences" }],
});

module.exports = mongoose.model("User", userSchema);
