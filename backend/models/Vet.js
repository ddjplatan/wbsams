const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VetSchema = new Schema(
  {
    email: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    workExperience: {
      type: String,
    },
    img: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vet", VetSchema);
