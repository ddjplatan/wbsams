const SpayAndNeuter = require("../models/SpayAndNeuter");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
const Pet = require("../models/Pet");

const postInstance = async (req, res, next) => {
  console.log(req.body);
  const { petName, petAge, petSpecies, petBreed, petGender, petDescription } =
    req.body;

  const owner = req.user._id;

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
    .populate("owner");
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
    const accountSid = "AC7c01e9a8da855422dd95dbf2be289d53";
    const authToken = "135d407e33f2cadf5b3f79b9aee9970c";
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        body: "Your spay/neuter registration has been declined",
        // from: "+18777804236",
        from: "+14092373119",
        to: "+639061783380",
      })
      .then((message) => console.log(message.sid));
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

const confirmRegistration = async (req, res, next) => {
  const { instanceId } = req.params;
  const accountSid = "AC7c01e9a8da855422dd95dbf2be289d53";
  const authToken = "135d407e33f2cadf5b3f79b9aee9970c";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "Your spay/neuter registration has been confirmed",
      // from: "+18777804236",
      from: "+14092373119",
      to: "+639061783380",
    })
    .then((message) => console.log(message.sid));

  await SpayNeuterAppointment.findOneAndUpdate(
    { _id: instanceId },
    { $set: { isApproved: true } },
    { new: true }
  );

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json({ success: true, message: "Adoption Successful" });
};

module.exports = {
  postInstance,
  getInstances,
  getInstance,
  updateInstance,
  deleteInstance,
  deleteInstances,
  confirmRegistration,
};
