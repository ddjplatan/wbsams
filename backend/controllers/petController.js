const Pet = require("../models/Pet");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

const getPets = async (req, res, next) => {
  const filter = {};
  const options = {
    sort: {
      createdAt: -1,
    },
  };
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  if (Object.keys(req.query).length) {
    // query parameter
    const { name, species, age, breed, gender, description, isAdopted } =
      req.query;

    if (name) filter.name = true;
    if (species) filter.species = true;
    if (age) filter.age = true;
    if (breed) filter.breed = true;
    if (description) filter.description = true;
    if (gender) filter.gender = true;

    if (limit) options.limit = limit;
    options.sort = {
      createdAt: -1,
    };
  }

  try {
    const count = await Pet.countDocuments(filter);
    const pets = await Pet.find(filter, {}, options).skip(skip).limit(limit);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .setHeader("X-Total-Count", `${count}`)
      .json({ pets, count });
  } catch (err) {
    throw new Error(`Error retrieving pets: ${err.message}`);
  }
};

const getAdoptedPets = async (req, res, next) => {
  const filter = { isAdopted: true };
  const options = {
    sort: {
      createdAt: -1,
    },
  };
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  if (Object.keys(req.query).length) {
    // query parameter
    const { name, species, age, breed, gender, description } = req.query;

    if (name) filter.name = true;
    if (species) filter.species = true;
    if (age) filter.age = true;
    if (breed) filter.breed = true;
    if (description) filter.description = true;
    if (gender) filter.gender = true;

    if (limit) options.limit = limit;
    options.sort = {
      createdAt: -1,
    };
  }

  try {
    const count = await Pet.countDocuments(filter);
    const pets = await Pet.find(filter, {}, options)
      .skip(skip)
      .limit(limit)
      .populate("owner");
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .setHeader("X-Total-Count", `${count}`)
      .json({ pets, count });
  } catch (err) {
    throw new Error(`Error retrieving pets: ${err.message}`);
  }
};

const getPet = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    res.status(200).setHeader("Content-Type", "application/json").json(pet);
  } catch (err) {
    throw new Error(
      `Error retrieving pet with ID of: ${req.params.petId}, ${err.message}`
    );
  }
};

const deletePets = async (req, res, next) => {
  try {
    await Pet.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, msg: "Deleted all pets" });
  } catch (err) {
    throw new Error(`Error retrieving User:${err.message}`);
  }
};

const deletePet = async (req, res, next) => {
  try {
    await Pet.findByIdAndDelete(req.params.petId);
    res
      .status(202)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, msg: "Successfully deleted a pet." });
  } catch (err) {
    throw new Error(
      `Error deleting Users with ID of: ${req.params.userId} ${err.message}`
    );
  }
};

const updatePet = async (req, res, next) => {
  try {
    const update = { ...req.body };
    const dynamicUpdate = {};

    Object.keys(update).forEach((key) => {
      if (update[key] !== undefined) {
        dynamicUpdate[key] = update[key];
      }
    });

    const updated = await Pet.findByIdAndUpdate(
      req.params.petId,
      dynamicUpdate,
      { new: true }
    );
    await updated.save();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "Updated pet" });
  } catch (err) {
    throw new Error(
      `Error updating pet with ID of: ${req.params.petId} ${err.message}`
    );
  }
};

const createPet = async (req, res, next) => {
  try {
    const { name, species, age, gender, breed, description } = req.body;
    console.log(req.file.path);
    const imgPath = req.file
      ? req.file.path.replace(/backend[\/\\]public[\/\\]/, "")
      : `defaults/default-${species}.jpg`;

    Pet.create({
      name,
      species,
      age,
      gender,
      breed,
      description,
      imgPath,
    })
      .then(() => {
        res
          .status(201)
          .setHeader("Content-Type", "application/json")
          .json({ success: true, message: "Successfully added pet" });
      })
      .catch((dbError) => {
        console.error(dbError);
        res.status(500).json({ error: "Database Error" });
      });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getPets,
  getPet,
  deletePets,
  deletePet,
  updatePet,
  createPet,
  getAdoptedPets,
};
