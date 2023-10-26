const SpayAndNeuter = require("../models/SpayAndNeuter");

const registerToSpayAndNeuter = async () => {
  try {
    const petId = req.body.petId;
    const instance = await SpayAndNeuter.findById(req.params.instanceId);
    if (instance.registeredPets.length >= instance.slots) {
      throw new Error("Slots are full");
    } else {
      instance.registeredPets.push(petId);
      res
        .status(200)
        .setHeader("Content-Type", "application/json")
        .json({ success: true, message: "Successfully registered" });
    }
  } catch (error) {
    throw new Error("Error checking slot");
  }
};

module.exports = {
  registerToSpayAndNeuter,
};
