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

const confirmAdoption = async (req, res, next) => {
  const { adoptee, adopter } = req.body;
  const accountSid = process.env.TWILIO_ACCOUNT_SID_PET;
  const authToken = process.env.TWILIO_AUTH_TOKEN_PET;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "Your adoption request has been confirmed. Congratulations",
      from: "+14092373119",
      to: "+639061783380",
    })
    .then((message) => console.log(message.sid));
  const { adoptionId } = req.params;

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
      { $set: { status: "Approved" } },
      { new: true }
    );

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Adoption Successful" });
  }
};

const deleteAdoption = async (req, res, next) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID_PET;
    const authToken = process.env.TWILIO_AUTH_TOKEN_PET;
    const client = require("twilio")(accountSid, authToken);
    client.messages
      .create({
        body: "Your adoption request has been declined",
        from: "+14092373119",
        to: "+639061783380",
      })
      .then((message) => console.log(message.sid));
    
    await Adoption.updateOne(
      { _id: req.params.adoptionId },
      { status: req.body.status }
    );
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Declined one adoption" });
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
    const { accompaniedBy, remarks } = req.body;
    const date = new Date(Date.now());

    const adoption = await Adoption.findById(req.params.adoptionId);
    adoption.checkups.push({
      accompaniedBy,
      remarks,
      date,
    });
    adoption.save();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addCheckup = async (req, res) => {
  const { petId } = req.params;
  const { accompaniedBy, remarks } = req.body;

  try {
    const newCheckup = new Checkup({
      accompaniedBy,
      remarks,
      date: new Date(),
    });

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    pet.checkups.push(newCheckup);

    await pet.save();

    res
      .status(200)
      .json({ checkup: newCheckup, message: "Checkup added successfully" });
  } catch (error) {
    console.error("Error adding checkup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getConfirmedAdoptions = async (req, res, next) => {
  const { skip, limit } = req.query;
  const count = await Adoption.countDocuments();
  const adoptions = await Adoption.find({ status: "Approved" })
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

const getCheckups = async (req, res) => {
  const { adoptionId } = req.params;

  try {
    const adoption = await Adoption.findById(adoptionId);

    if (!adoption) {
      return res.status(404).json({ error: "Adoption not found" });
    }

    await adoption.populate("checkups");

    res.status(200).json(adoption.checkups);
  } catch (error) {
    console.error("Error fetching checkups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendSMSInvite = async (req, res, next) => {
  console.log("sending invite");
  const accountSid = process.env.TWILIO_ACCOUNT_SID_PET;
  const authToken = process.env.TWILIO_AUTH_TOKEN_PET;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "Hi! CAWS here. We're excited to extend an invitation for a screening about your adoption inquiry. You can drop by City Vet on any weekday.",
      from: "+14092373119",
      to: "+639061783380",
    })
    .then((message) => console.log(message.sid, "message sent"));

  next();
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
  addCheckup,
  getConfirmedAdoptions,
  getCheckups,
  sendSMSInvite,
};
