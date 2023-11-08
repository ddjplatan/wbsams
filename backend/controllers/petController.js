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

// const deletePets = async (req, res, next) => {
//   try {
//     await Pet.deleteMany();
//     res
//       .status(200)
//       .setHeader("Content-Type", "application/json")
//       .json({ success: true, msg: "Deleted all pets" });
//   } catch (err) {
//     throw new Error(`Error retrieving User:${err.message}`);
//   }
// };

const deletePet = async (req, res, next) => {
  try {
    // const options = {
    //   sort: {
    //     createdAt: -1,
    //   },
    // };

    // const pet = await Pet.findById(req.params.petId);

    // await Session.updateMany(
    //   { learners: user._id },
    //   { $pull: { learners: user._id } }
    // );

    // await Class.updateMany(
    //   { instructor: user._id },
    //   { $pull: { instructor: user._id } }
    // );

    await Pet.findByIdAndDelete(req.params.petId);
    // const users = await User.find({}, {}, options);
    // req.action = `DELETE USER`;
    // req.details = `deleted user: ${user.email}`;
    // next();
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
    // const user = await Pet.findById(req.params.petId);
    // const user = await User.findOne({ email: req.body.email });

    const update = { ...req.body };
    const updated = await Pet.findByIdAndUpdate(req.params.petId, update, {
      new: true,
    });
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
    upload.single("image")(req, res, async function (err) {
      if (err) {
        throw new Error(`Error uploading attachment: ${err.message}`);
      } else {
        // if (!req.file) {
        //   throw new Error("No file uploaded");
        // }
        const { name, species, age, breed, description, gender } = req.body;
        // const { path } = req.file;
        // const path = `uploads/` + req.file.filename;

        const pet = await Pet.create({
          name,
          species,
          age,
          breed,
          description,
          gender,
          // imgPath: path,
        });

        res
          .status(201)
          .setHeader("Content-Type", "application/json")
          .json({ success: true, message: "Created new pet", pet });
      }
    });
    // console.log("req.file", req.file);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getPets,
  getPet,
  // deletePets,
  deletePet,
  updatePet,
  createPet,
  getAdoptedPets,
};
