const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const visaSchema = new Schema(
  {
    fullname: String,
    gender: String,
    visaId: String,
    passportPhotoUrl: String,
    passportSizePhotoUrl: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    dob: Date,
    birthPlace: String,
    nationality: { type: String, index: true },
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
      index: true,
    },
    redNotice: [{ String }],
    yellowNotice: [{ String }],
    unNotice: [{ String }],
  },
  { timestamps: true }
);
visaSchema.index({ visaStatus: 1, nationality: 1, createdAt: 1 });

visaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Visa", visaSchema);
