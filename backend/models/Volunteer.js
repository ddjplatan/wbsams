const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const VolunteerSchema = new Schema(
  {
    email: {
      type: String,
      //   required: [true, "An email is required!"],
      //   unique: [
      //     true,
      //     "The email has already been registered, try to login please!",
      //   ],
      validate: (email) => {
        return validator.isEmail(email);
      },
    },

    firstName: {
      type: String,
      //   required: [true, "Please input your first name!"],
      trim: true,
      maxlength: [100, "First name is too long"],
    },
    lastName: {
      type: String,
      //   required: [true, "Please input your last name!"],
      trim: true,
      maxlength: [50, "Last name is too long"],
    },

    phoneNumber: {
      type: String,
      //   required: [true, "Please enter your phone number!"],
      //   unique: [true, "Phone number already taken!"],
    },

    address: {
      type: String,
    },
    workExperience: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);
