const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interestSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Interest", interestSchema);
