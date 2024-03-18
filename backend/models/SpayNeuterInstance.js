const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpayNeuterInstanceSchema = new Schema(
  {
    location: {
      type: String,
    },
    slots: {
      type: Number,
    },
    registered: [{ type: Schema.Types.ObjectId, ref: "SpayNeuterAppointment" }],
    schedule: {
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

module.exports = mongoose.model("SpayNeuterInstance", SpayNeuterInstanceSchema);
