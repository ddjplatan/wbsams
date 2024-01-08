const SpayNeuterInstance = require("../models/SpayNeuterInstance");
// const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
// const Pet = require("../models/Pet");

const postSpayNeuterInstance = async (req, res, next) => {
  const { location, slots, details } = req.body;
  console.log(req.body);
  try {
    await SpayNeuterInstance.create({
      location,
      slots,
      details,
    });

    res.status(201).setHeader("Content-Type", "application/json").json({
      success: true,
      message: "Successfully created Spay/Neuter instance",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

const getSpayNeuterInstance = async (req, res, next) => {
  try {
    const instance = await SpayNeuterInstance.findById(req.params.instanceId);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(instance);
  } catch (err) {
    console.error(err);
  }
};

const getSpayNeuterInstances = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await SpayNeuterInstance.countDocuments();
  const instances = await SpayNeuterInstance.find().skip(skip).limit(limit);
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(instances);
};

const updateSpayNeuterInstance = async (req, res, next) => {
  try {
    const result = await SpayNeuterInstance.findByIdAndUpdate(
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

const deleteSpayNeuterInstance = async (req, res, next) => {
  try {
    await SpayNeuterInstance.deleteOne({ _id: req.params.instanceId });
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
  postSpayNeuterInstance,
  getSpayNeuterInstances,
  getSpayNeuterInstance,
  updateSpayNeuterInstance,
  deleteSpayNeuterInstance,
  //   deleteInstances,
  //   confirmRegistration,
};
