const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pet name required"],
    },
    species: {
      type: String,
      required: true,
      enum: ["Cat", "Dog", "Bird"],
    },
    age: {
      type: String,
      required: [true, "Please input pet's age"],
    },
    breed: {
      type: String,

      required: [true, "Please indicate the breed"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    description: {
      type: String,
      required: [true, "Please input a short description of the pet"],
    },
    imgPath: {
      type: String,
      // required: [true, "Please upload a picture of the pet"],
    },
    isAdopted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pet", PetSchema);
