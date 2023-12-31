const Volunteer = require("../models/Volunteer");

const postVolunteer = async (req, res, next) => {
  const { email, firstName, lastName, phoneNumber, address, workExperience } =
    req.body;

  const img = req.upload
    ? req.upload.secure_url
    : "https://res.cloudinary.com/dhndw6jia/image/upload/v1704408190/bla6dbcsi1gvxslngj6x.png";

  try {
    await Volunteer.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      workExperience,
      img,
    });

    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Volunteer posted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getVolunteer = async (req, res, next) => {
  try {
    const Volunteer = await Volunteer.findById(req.params.volunteerId);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(Volunteer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getVolunteers = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Volunteer.countDocuments();
  const Volunteers = await Volunteer.find().skip(skip).limit(limit);
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(Volunteers);
};

const updateVolunteer = async (req, res, next) => {
  try {
    let updateFields = { ...req.body };

    if (req.upload) {
      updateFields.img = req.upload.secure_url;
    }

    const result = await Volunteer.findByIdAndUpdate(
      req.params.volunteerId,
      {
        $set: updateFields,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated volunteer",
      updatedVet: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVolunteer = async (req, res, next) => {
  try {
    await Volunteer.deleteOne({ _id: req.params.volunteerId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one event" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVolunteers = async (req, res, next) => {
  try {
    await Volunteer.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all Volunteers" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
  deleteVolunteers,
};
