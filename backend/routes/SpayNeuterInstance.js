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
  convertSpayAndNeuterInstance,
  convertSpayNeuterInstanceToPdf,
} = require("../controllers/filesController");

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

router
  .route("/:instanceId/toCsv")
  .get(
    reqReceived,
    protectedRoute,
    staffValidator,
    convertSpayAndNeuterInstance
  );

router
  .route("/:instanceId/toPdf")
  .get(
    reqReceived,
    protectedRoute,
    staffValidator,
    convertSpayNeuterInstanceToPdf
  );

module.exports = router;
