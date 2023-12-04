const SpayAndNeuter = require("../models/SpayAndNeuter");
const SpayNeuterAppointment = require("../models/SpayNeuterAppointment");

const registerToSpayAndNeuter = async () => {
  try {
    const pet = req.body.petId;
    const owner = req.user._id;
    const spayNeuterInstanceId = req.params.instanceId;
    const instance = await SpayAndNeuter.findById(req.params.instanceId);
    if (instance.registeredPets.length >= instance.slots) {
      throw new Error("Slots are full");
    } else {
      await SpayNeuterAppointment.create({
        pet,
        owner,
        spayNeuterInstanceId,
      });
      res.status(200).setHeader("Content-Type", "application/json").json({
        success: true,
        message: "Successfully applied for spay/neuter",
      });
    }
  } catch (error) {
    throw new Error("Error checking slot");
  }
};

const confirmRegistration = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const spayNeuterAppointment = await SpayNeuterAppointment.findById(
      appointmentId
    );

    await SpayNeuterAppointment.findOneAndUpdate(
      { _id: appointmentId },
      { $set: { isApproved: true } },
      { new: true }
    );

    const spayAndNeuterInstance = await SpayAndNeuter.findById(
      spayNeuterAppointment.spayNeuterInstanceId
    );

    if (
      spayAndNeuterInstance.registeredPets.length >= spayAndNeuterInstance.slots
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Slots are full" });
    } else {
      spayAndNeuterInstance.registeredPets.push(spayNeuterAppointment.pet);
      await spayAndNeuterInstance.save();
    }

    return res.status(200).json({
      success: true,
      message: "Successfully reserved slot for spay/neuter",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error confirming registration" });
  }
};

const deleteRegistration = async (req, res, next) => {
  try {
    await SpayNeuterAppointment.deleteOne({ _id: req.params.appointmentId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one appointment" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerToSpayAndNeuter,
  confirmRegistration,
  deleteRegistration,
};
