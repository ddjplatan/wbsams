const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpayNeuterAppointmentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petName: {
      type: String,
    },
    petSpecies: {
      type: String,
      enum: ["Cat", "Dog"],
    },
    petAge: {
      type: String,
    },
    petBreed: {
      type: String,
    },
    petGender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    petDescription: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    instanceId: {
      type: Schema.Types.ObjectId,
      ref: "SpayNeuterInstance",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SpayNeuterAppointment",
  SpayNeuterAppointmentSchema
);
