const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
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
  convertDonation,
  convertDonationToPdf,
} = require("../controllers/filesController");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  deleteDonations,
} = require("../controllers/donationController");

router
  .route("/")
  .post(
    reqReceived,
    protectedRoute,
    staffValidator,
    upload.single("img"),
    async (req, res, next) => {
      const upload = await cloudinary.uploader.upload(req.file.path);
      next();
    },
    postDonation
  )
  .get(reqReceived, getDonations)
  .delete(reqReceived, protectedRoute, adminValidator, deleteDonations);

router.route("/toCsv").get(reqReceived, convertDonation);
router.route("/toPdf").get(reqReceived, convertDonationToPdf);

router
  .route("/:donationId")
  .get(reqReceived, getDonation)
  .put(reqReceived, protectedRoute, staffValidator, updateDonation)
  .delete(reqReceived, protectedRoute, staffValidator, deleteDonation);

module.exports = router;
