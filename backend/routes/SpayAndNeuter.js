const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postInstance,
  getInstances,
  getInstance,
  updateInstance,
  deleteInstance,
  deleteInstances,
  confirmRegistration,
} = require("../controllers/spayAndNeuterController");

const {
  registerToSpayAndNeuter,
} = require("../controllers/registrationController");

const {
  convertSpayAndNeuter,
  convertSpayAndNeuterToPdf,
} = require("../controllers/filesController");

router
  .route("/")
  // .post(reqReceived, protectedRoute, postInstance)
  .get(reqReceived, protectedRoute, getInstances)
  .delete(reqReceived, protectedRoute, adminValidator, deleteInstances);

router.route("/toCsv").get(reqReceived, convertSpayAndNeuter);
router.route("/toPdf").get(reqReceived, convertSpayAndNeuterToPdf);

router
  .route("/:instanceId")
  .post(reqReceived, protectedRoute, postInstance)
  .put(reqReceived, protectedRoute, updateInstance)
  .get(reqReceived, protectedRoute, getInstance)
  .delete(reqReceived, protectedRoute, staffValidator, deleteInstance);

router
  .route("/:appointmentId/confirm")
  .get(reqReceived, protectedRoute, staffValidator, confirmRegistration);

router
  .route("/:appointmentId/register")
  .post(reqReceived, protectedRoute, registerToSpayAndNeuter);

module.exports = router;
