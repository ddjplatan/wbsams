const SpayAndNeuter = require("../models/SpayAndNeuter");
const Pet = require("../models/Pet");

const postInstance = async (req, res, next) => {
  const { location, date, slots, otherDetails } = req.body;

  try {
    await SpayAndNeuter.create({
      location,
      date,
      slots,
      otherDetails,
    });

    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Instance created" });
  } catch (err) {
    console.error(err);
  }
};

const getInstance = async (req, res, next) => {
  try {
    const instance = await SpayAndNeuter.findById(req.params.instanceId);
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
  const count = await SpayAndNeuter.countDocuments();
  const instances = await SpayAndNeuter.find()
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
    const result = await SpayAndNeuter.findByIdAndUpdate(
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
    await SpayAndNeuter.deleteOne({ _id: req.params.instanceId });
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
    await SpayAndNeuter.deleteMany();
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
