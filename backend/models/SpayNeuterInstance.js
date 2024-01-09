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
    details: {
      type: String,
    },
    registered: [{ type: Schema.Types.ObjectId, ref: "SpayNeuterAppointment" }],
    schedule: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SpayNeuterInstance", SpayNeuterInstanceSchema);
