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
        message: "Successfully applied for spay/neuters",
      });
    }
  } catch (error) {
    throw new Error("Error checking slot");
  }
};

// const confirmRegistration = async () => {
//   try {
//     const { appointmentId } = req.params;
//     const spayNeuterAppointment = await SpayNeuterAppointment.findById(appointmentId)
//     const spayNeuterInstanceId = spayNeuterAppointment.spayNeuterInstanceId
//   }
//   } catch (error) {}
// };

module.exports = {
  registerToSpayAndNeuter,
};
