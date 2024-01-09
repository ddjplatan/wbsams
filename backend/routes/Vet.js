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
} = require("../middlewares/utils/validators");

const {
  postVet,
  getVets,
  getVet,
  updateVet,
  deleteVet,
  deleteVets,
} = require("../controllers/vetController");

router
  .route("/")
  .post(
    reqReceived,
    protectedRoute,
    staffValidator,
    upload.single("img"),
    async (req, res, next) => {
      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        req.upload = upload;
      } else {
        req.upload === null;
      }
      next();
    },
    postVet
  )
  .get(reqReceived, getVets)
  .delete(reqReceived, protectedRoute, adminValidator, deleteVets);

router
  .route("/:vetId")
  .get(reqReceived, getVet)
  .put(
    reqReceived,
    protectedRoute,
    upload.single("img"),
    async (req, res, next) => {
      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        req.upload = upload;
      } else {
        req.upload === null;
      }
      next();
    },
    updateVet
  )
  .delete(reqReceived, protectedRoute, staffValidator, deleteVet);

module.exports = router;
