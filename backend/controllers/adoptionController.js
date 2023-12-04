const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");

const postAdoption = async (req, res, next) => {
  const adopter = req.user._id;
  const adoptee = req.body._id;
  const date = new Date(Date.now());

  const { reason, parentJob } = req.body;

  try {
    await Adoption.create({
      adopter,
      adoptee,
      date,
      reason,
      parentJob,
    });

    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully requested adoption" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const confirmAdoption = async (req, res, next) => {
  const { adoptionId } = req.params;

  const { adoptee, adopter } = req.body;
  if (adoptee.isAdopted) {
    res
      .status(400)
      .setHeader({ success: false, message: "That pet already has its owner" });
  } else {
    await Pet.findOneAndUpdate(
      { _id: adoptee._id },
      { $set: { isAdopted: true, owner: adopter._id } },
      { new: true }
    );

    await Adoption.findOneAndUpdate(
      { _id: adoptionId },
      { $set: { isApproved: true } },
      { new: true }
    );

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Adoption Successful" });
  }
};

const getAdoptions = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Adoption.countDocuments();
  const adoptions = await Adoption.find()
    .skip(skip)
    .limit(limit)
    .populate("adopter")
    .populate("adoptee");

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(adoptions);
};

const getAdoption = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.adoptionId);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(adoption);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAdoption = async (req, res, next) => {
  try {
    const result = await Adoption.findByIdAndUpdate(
      req.params.adoptionId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).setHeader("Content-Type", "application/json").json({
      success: true,
      message: "Successfully updated adoption details",
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteAdoption = async (req, res, next) => {
  try {
    await Adoption.deleteOne({ _id: req.params.adoptionId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one adoption" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAdoptions = async (req, res, next) => {
  try {
    await Adoption.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all adoptions" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const postCheckup = async (req, res, next) => {
  try {
    const checkupDetails = req.body;
    const adoption = await Adoption.findById(req.params.adoptionId);
    adoption.checkups.push(checkupDetails);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postAdoption,
  getAdoptions,
  updateAdoption,
  getAdoption,
  deleteAdoption,
  deleteAdoptions,
  postCheckup,
  confirmAdoption,
};
