const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postVolunteer,
  getVolunteers,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
  deleteVolunteers,
} = require("../controllers/VolunteerController");

router
  .route("/")
  .post(reqReceived, protectedRoute, staffValidator, postVolunteer)
  .get(reqReceived, getVolunteers)
  .delete(reqReceived, protectedRoute, adminValidator, deleteVolunteers);

router
  .route("/:volunteerId")
  .get(reqReceived, getVolunteer)
  .put(reqReceived, protectedRoute, staffValidator, updateVolunteer)
  .delete(reqReceived, protectedRoute, staffValidator, deleteVolunteer);

module.exports = router;
