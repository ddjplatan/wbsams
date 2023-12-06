const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

import {
  postAppointment
} = require ("../controllers/spayNeuterAppointment")

router
  .route("/")
  .post(reqReceived, protectedRoute, postAppointment)
  .get(reqReceived, protectedRoute, getInstances)
  .delete(reqReceived, protectedRoute, adminValidator, deleteInstances);

router.route;
