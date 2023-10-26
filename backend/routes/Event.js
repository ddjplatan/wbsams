const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,
} = require("../controllers/eventController");

router
  .route("/")
  .post(reqReceived, protectedRoute, staffValidator, postEvent)
  .get(reqReceived, getEvents)
  .delete(reqReceived, protectedRoute, adminValidator, deleteEvents);

router
  .route("/:eventId")
  .get(reqReceived, getEvent)
  .put(reqReceived, protectedRoute, staffValidator, updateEvent)
  .delete(reqReceived, protectedRoute, staffValidator, deleteEvent);

module.exports = router;
