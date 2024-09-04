const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
    address: String,
  },
  address: String,
  cost: Number,
  description: String,
  imageUrl: String,
  openHours: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  amenities: [{ type: Schema.Types.ObjectId, ref: "Amenity" }],
  timefromColombo: String,
  telephone: String,
  email: String,
  web: String,
});
// Creating a geospatial index on the `location` field
hotelSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hotel", hotelSchema);
