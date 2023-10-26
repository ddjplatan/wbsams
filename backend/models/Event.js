const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
