const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["succeeded", "failed"],
      required: true,
    },
    paymentIntentId: { type: String, required: true },
    card_id: { type: Schema.Types.ObjectId, ref: "Card" },
    paymentType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
