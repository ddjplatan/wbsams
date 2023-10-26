const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pet = require("./Pet");

const SpayAndNeuterSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    otherDetails: {
      type: String,
    },
    slots: {
      type: Number,
      required: true,
    },
    registeredPets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SpayAndNeuter", SpayAndNeuterSchema);
