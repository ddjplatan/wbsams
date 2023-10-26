const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

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
  .post(reqReceived, protectedRoute, staffValidator, postDonation)
  .get(reqReceived, getDonations)
  .delete(reqReceived, protectedRoute, adminValidator, deleteDonations);

router
  .route("/:donationId")
  .get(reqReceived, getDonation)
  .put(reqReceived, protectedRoute, staffValidator, updateDonation)
  .delete(reqReceived, protectedRoute, staffValidator, deleteDonation);

module.exports = router;
