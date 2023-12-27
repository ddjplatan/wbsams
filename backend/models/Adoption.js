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
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    parentJob: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Invited", "Pending", "Approved"],
      default: "Pending",
    },
    // isApproved: {
    //   type: Boolean,
    //   default: false,
    // },
    remarks: {
      type: String,
    },
    checkups: [CheckupSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Adoption", AdoptionSchema);
