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
    address: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
    img: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", DonationSchema);
