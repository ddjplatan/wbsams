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
  convertVolunteer,
  convertVolunteerToPdf,
} = require("../controllers/filesController");

const {
  postVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
  deleteVolunteers,
} = require("../controllers/volunteerController");

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
    postVolunteer
  )
  .get(reqReceived, getVolunteers)
  .delete(reqReceived, protectedRoute, adminValidator, deleteVolunteers);

router.route("/toCsv").get(reqReceived, convertVolunteer);
router.route("/toPdf").get(reqReceived, convertVolunteerToPdf);

router
  .route("/:volunteerId")
  .get(reqReceived, getVolunteer)
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
    updateVolunteer
  )
  .delete(reqReceived, protectedRoute, staffValidator, deleteVolunteer);

module.exports = router;
