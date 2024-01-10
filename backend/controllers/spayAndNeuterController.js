const SpayAndNeuter = require("../models/SpayAndNeuter");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");
const SpayNeuterInstance = require("../models/SpayNeuterInstance");
const Pet = require("../models/Pet");

const postInstance = async (req, res, next) => {
  const { petName, petAge, petSpecies, petBreed, petGender, petDescription } =
    req.body;

  const { instanceId } = req.params;

  const instance = await SpayNeuterInstance.findById(instanceId);
  if (instance.registered.length >= instance.slots) {
    res.status(400).setHeader("Content-Type", "application/json").json({
      success: false,
      message: "Instance is full",
    });
  }

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
      instanceId,
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
    const accountSid = process.env.TWILIO_ACCOUNT_SID_PET;
    const authToken = process.env.TWILIO_AUTH_TOKEN_PET;
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
  const { appointmentId } = req.params;
  const accountSid = process.env.TWILIO_ACCOUNT_SID_PET;
  const authToken = process.env.TWILIO_AUTH_TOKEN_PET;
  const client = require("twilio")(accountSid, authToken);
  const appointment = await SpayNeuterAppointment.findById(appointmentId);
  client.messages
    .create({
      body: "Your spay/neuter registration has been confirmed",
      from: "+14092373119",
      to: "+639061783380",
    })
    .then((message) => console.log(message.sid));

  await SpayNeuterAppointment.findOneAndUpdate(
    { _id: appointmentId },
    { $set: { isApproved: true } },
    { new: true }
  );

  const instance = await SpayNeuterInstance.findById(appointment.instanceId);
  console.log(instance);
  instance.registered.push(appointmentId);

  await instance.save();

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json({ success: true, message: "Registration Successful" });
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
