const SpayAndNeuter = require("../models/SpayAndNeuter");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
const Pet = require("../models/Pet");

const postInstance = async (req, res, next) => {
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
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getInstance = async (req, res, next) => {
  try {
    const instance = await SpayNeuterAppointment.findById(
      req.params.instanceId
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(instance);
  } catch (err) {
    console.error(err);
  }
};

const getInstances = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await SpayNeuterAppointment.countDocuments();
  const instances = await SpayNeuterAppointment.find()
    .skip(skip)
    .limit(limit)
    .populate("registeredPets");
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(instances);
};

const updateInstance = async (req, res, next) => {
  try {
    const result = await SpayNeuterAppointment.findByIdAndUpdate(
      req.params.instanceId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully updated instance" });
  } catch (err) {
    console.error(err);
  }
};

const deleteInstance = async (req, res, next) => {
  try {
    await SpayNeuterAppointment.deleteOne({ _id: req.params.instanceId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one instance" });
  } catch (err) {
    console.error(err);
  }
};

const deleteInstances = async (req, res, next) => {
  try {
    await SpayNeuterAppointment.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all instances" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postInstance,
  getInstances,
  getInstance,
  updateInstance,
  deleteInstance,
  deleteInstances,
};
