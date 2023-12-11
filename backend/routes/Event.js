const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");
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
  .post(
    reqReceived,
    protectedRoute,
    staffValidator,
    upload.single("img"),
    postEvent
  )
  .get(reqReceived, getEvents)
  .delete(reqReceived, protectedRoute, adminValidator, deleteEvents);

router
  .route("/:eventId")
  .get(reqReceived, getEvent)
  .put(reqReceived, protectedRoute, staffValidator, updateEvent)
  .delete(reqReceived, protectedRoute, staffValidator, deleteEvent);

module.exports = router;
