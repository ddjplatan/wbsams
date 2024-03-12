const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
const SpayAndNeuter = require("../models/SpayAndNeuter");
const Pet = require("../models/Pet");

const postAppointment = async (req, res, next) => {
  const owner = req.user._id;
  const { petName, petAge, petSpecies, petBreed, petGender, petDescription } =
    req.body;

  try {
    await SpayNeuterAppointment.create({
      owner,
      petName,
      petAge,
      petSpecies,
      petBreed,
      petGender,
      petDescription,
    });

    res.status(201).setHeader("Content-Type", "application/json").json({
      success: true,
      message: "Successfully requested appointment for spay/neuter",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const confirmAppointment = async (req, res, next) => {
  const { appointmentId } = req.params;

  const { owner, pet } = req.body;

  const appointment = await Adoption.findById(appointmentId);

  await SpayNeuterAppointment.findOneAndUpdate(
    { _id: appointmentId },
    { $set: { status: "Approved" } },
    { new: true }
  );

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json({ success: true, message: "Adoption Successful" });
};

const getAdoptions = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Adoption.countDocuments();
  const adoptions = await Adoption.find()
    .skip(skip)
    .limit(limit)
    .populate("adopter")
    .populate("adoptee");

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(adoptions);
};

const getAdoption = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.adoptionId);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(adoption);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAdoption = async (req, res, next) => {
  try {
    const result = await Adoption.findByIdAndUpdate(
      req.params.adoptionId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).setHeader("Content-Type", "application/json").json({
      success: true,
      message: "Successfully updated adoption details",
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteAdoption = async (req, res, next) => {
  try {
    await Adoption.deleteOne({ _id: req.params.adoptionId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one adoption" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAdoptions = async (req, res, next) => {
  try {
    await Adoption.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all adoptions" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const postCheckup = async (req, res, next) => {
  try {
    const checkupDetails = req.body;
    const adoption = await Adoption.findById(req.params.adoptionId);
    adoption.checkups.push(checkupDetails);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postAppointment,
  getAdoptions,
  updateAdoption,
  getAdoption,
  deleteAdoption,
  deleteAdoptions,
  postCheckup,
  //   confirmAdoption,
};
