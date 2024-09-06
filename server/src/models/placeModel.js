const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  imageUrl: String,
  name: { type: String, required: true },
  cost: Number,
  duration: String,
  openHours: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
    address: String,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  description: String,
  interests: [{ type: Schema.Types.ObjectId, ref: "Interest" }],
  distancefromColombo: String,
  telephone: String,
  email: String,
  web: String,
  address: String,
});

placeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Place", placeSchema);
