const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: String,
  description: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
    address: String,
  },
  bucketlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
  aiGenerated: Boolean,
  duration: String,
  cost: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Experiences", experienceSchema);
