const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter vet name"],
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    skills: {
      type: String,
    },
    education: {
      type: String,
    },
    experience: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vet", VetSchema);
