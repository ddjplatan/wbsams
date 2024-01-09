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
  postSpayNeuterInstance,
  getSpayNeuterInstances,
  getSpayNeuterInstance,
  updateSpayNeuterInstance,
  deleteSpayNeuterInstance,
} = require("../controllers/spayNeuterInstanceController");

router
  .route("/")
  .post(reqReceived, protectedRoute, postSpayNeuterInstance)
  .get(reqReceived, protectedRoute, getSpayNeuterInstances);
//   .delete(reqReceived, protectedRoute, adminValidator, deleteInstances);

router
  .route("/:instanceId")
  .post(reqReceived, protectedRoute, postInstance)
  .put(reqReceived, protectedRoute, updateSpayNeuterInstance)
  .get(reqReceived, protectedRoute, getSpayNeuterInstance)
  .delete(
    reqReceived,
    protectedRoute,
    staffValidator,
    deleteSpayNeuterInstance
  );

module.exports = router;
