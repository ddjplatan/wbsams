const Donation = require("../models/Donation");

const postDonation = async (req, res, next) => {
  const { donor, donationType, address, remarks } = req.body;
  const date = new Date(Date.now());

  const img = req.file
    ? req.file.path.replace(/backend[\/\\]public[\/\\]/, "").replace(/\\/g, "/")
    : "defaults/default-profile.png";

  try {
    await Donation.create({
      donor,
      date,
      donationType,
      address,
      remarks,
      img,
    });

    res
      .status(201)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Donation posted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.donationId);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(donation);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getDonations = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Donation.countDocuments();
  const donations = await Donation.find().skip(skip).limit(limit);
  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .setHeader("X-Total-Count", `${count}`)
    .json(donations);
};

const updateDonation = async (req, res, next) => {
  try {
    const result = await Donation.findByIdAndUpdate(
      req.params.donationId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, result });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDonation = async (req, res, next) => {
  try {
    await Donation.deleteOne({ _id: req.params.donationId });
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Successfully deleted one event" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDonations = async (req, res, next) => {
  try {
    await Donation.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Deleted all donations" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  postDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  deleteDonations,
};
