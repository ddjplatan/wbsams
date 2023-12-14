const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    img: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", NewsSchema);
