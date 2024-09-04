const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Amenity", facilitySchema);
