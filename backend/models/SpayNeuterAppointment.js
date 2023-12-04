const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpayNeuterAppointmentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    spayNeuterInstanceId: {
      type: Schema.Types.ObjectId,
      ref: "SpayAndNeuter",
    },
    isApproved: {
      type: Boolean,
      default: false,
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
