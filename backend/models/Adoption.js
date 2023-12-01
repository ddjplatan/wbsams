const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckupSchema = new Schema({
  accompaniedBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
  },
});

const AdoptionSchema = new Schema(
  {
    adopter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adoptee: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    reason: {
      type: String,
      required: [true, "Please input reason for adoption"],
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    parentJob: {
      type: String,
      required: [true, "Please indicate the furparent's job"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    checkups: [CheckupSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Adoption", AdoptionSchema);
