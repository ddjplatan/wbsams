const Vet = require("../models/Vet");

const postVet = async (req, res, next) => {
  const { email, firstName, lastName, address, phoneNumber, workExperience } =
    req.body;

  const img = req.file
    ? req.file.path.replace(/backend[\/\\]public[\/\\]/, "").replace(/\\/g, "/")
    : "defaults/default-profile.png";

  try {
    await Vet.create({
      email,
      firstName,
      lastName,
      address,
      phoneNumber,
      workExperience,
      img,
    });

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Vet posted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getVet = async (req, res, next) => {
  try {
    const Vet = await Vet.findById(req.params.vetId);
    res.status(200).setHeader("Content-Type", "application/json").json(Vet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getVets = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Vet.countDocuments();
  const Vets = await Vet.find().skip(skip).limit(limit);
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(Vets);
};

const updateVet = async (req, res, next) => {
  try {
    const result = await Vet.findByIdAndUpdate(
      req.params.vetId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully updated vet" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVet = async (req, res, next) => {
  console.log("delete delete");
  try {
    await Vet.deleteOne({ _id: req.params.vetId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one vet" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteVets = async (req, res, next) => {
  try {
    await Vet.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all vets" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postVet,
  getVets,
  getVet,
  updateVet,
  deleteVet,
  deleteVets,
};
