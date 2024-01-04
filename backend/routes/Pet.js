const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/public/uploads");
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
  limits: { fileSize: 1024 * 1024 * 5 },
  // dest: "./public/uploads",
});
const {
  adminValidator,
  staffValidator,
  petOwnerValidator,
} = require("../middlewares/utils/validators");

const { convertPets } = require("../controllers/filesController");

const {
  getPets,
  getPet,
  deletePets,
  deletePet,
  updatePet,
  createPet,
  getAdoptedPets,
} = require("../controllers/petController");
const { postAdoption } = require("../controllers/adoptionController");

router
  .route("/")
  .post(
    reqReceived,
    protectedRoute,
    upload.single("image"),
    async (req, res, next) => {
      const upload = await cloudinary.uploader.upload(req.file.path);
      next();
    },
    createPet
  )
  .get(reqReceived, getPets)
  .delete(reqReceived, protectedRoute, adminValidator, deletePets);

router.route("/toCsv").get(reqReceived, convertPets);

router
  .route("/adoptedPets")
  .get(reqReceived, protectedRoute, staffValidator, getAdoptedPets);

router
  .route("/:petId")
  .get(reqReceived, getPet)
  .put(
    reqReceived,
    protectedRoute,
    staffValidator,
    upload.single("image"),
    async (req, res, next) => {
      const upload = await cloudinary.uploader.upload(req.file.path);
      next();
    },
    updatePet
  )
  .delete(reqReceived, protectedRoute, staffValidator, deletePet);

router.route("/:petId/adopt").post(reqReceived, protectedRoute, postAdoption);

module.exports = router;
