const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    visaId: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
