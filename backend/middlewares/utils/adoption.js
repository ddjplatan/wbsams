const Pet = require("../../models/Pet");
const petAdopted = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    pet.adopted = true;
    next();
  } catch (error) {
    console.log("Server error: petAdopted middleware");
  }
};

module.exports = { petAdopted };
