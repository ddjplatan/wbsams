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

router
  .route("/")
  .post(reqReceived, protectedRoute, postInstance)
  .get(reqReceived, protectedRoute, getInstances)
  .delete(reqReceived, protectedRoute, adminValidator, deleteInstances);

router
  .route("/:instanceId")
  .put(reqReceived, protectedRoute, updateInstance)
  .get(reqReceived, protectedRoute, getInstance)
  .delete(reqReceived, protectedRoute, staffValidator, deleteInstance);

router
  .route("/:instanceId/confirm")
  .get(reqReceived, protectedRoute, staffValidator, confirmRegistration);

router
  .route("/:instanceId/register")
  .post(reqReceived, protectedRoute, registerToSpayAndNeuter);

module.exports = router;
