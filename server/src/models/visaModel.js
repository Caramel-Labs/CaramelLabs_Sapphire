const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const visaSchema = new Schema(
  {
    fullname: String,
    gender: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    dob: Date,
    birthPlace: String,
    nationality: String,
    address: String,
    height: String,
    fathersName: String,
    civilStatus: String,
    sponsorName: String,
    sponsorNationality: String,
    validdays: Number,
    passportImgUrl: String,
    bankStatementImgUrl: String,
    visaStatus: {
      type: String,
      enum: ["valid", "inProgress", "rejected", "expired"],
      default: "inProgress",
    },
  },
  { timestamps: true }
);
visaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Visa", visaSchema);
