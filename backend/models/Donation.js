const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema(
  {
    donor: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    donationType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", DonationSchema);
