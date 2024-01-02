const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  convertAdoption,
  convertAdoptionToPdf,
  convertCheckupsToCsv,
  convertCheckupsToPdf,
} = require("../controllers/filesController");

const {
  postAdoption,
  getAdoptions,
  updateAdoption,
  getAdoption,
  deleteAdoption,
  deleteAdoptions,
  postCheckup,
  confirmAdoption,
  getConfirmedAdoptions,
  getCheckups,
  sendSMSInvite,
} = require("../controllers/adoptionController");

router
  .route("/")
  .post(reqReceived, protectedRoute, postAdoption)
  .get(reqReceived, protectedRoute, staffValidator, getAdoptions)
  .delete(reqReceived, protectedRoute, adminValidator, deleteAdoptions);

router.route("/toCsv").get(
  reqReceived,
  // , protectedRoute, adminValidator
  convertAdoption
);

router.route("/toPdf").get(reqReceived, convertAdoptionToPdf);

router
  .route("/confirmed")
  .get(reqReceived, protectedRoute, staffValidator, getConfirmedAdoptions);

router
  .route("/:adoptionId")
  .put(reqReceived, protectedRoute, updateAdoption)
  .get(reqReceived, protectedRoute, getAdoption)
  .delete(reqReceived, protectedRoute, staffValidator, deleteAdoption);

router
  .route("/:adoptionId/invite")
  .put(
    reqReceived,
    protectedRoute,
    staffValidator,
    sendSMSInvite,
    updateAdoption
  );

router
  .route("/:adoptionId/confirm")
  .post(reqReceived, protectedRoute, staffValidator, confirmAdoption);

router
  .route("/:adoptionId/checkup")
  .get(reqReceived, protectedRoute, staffValidator, getCheckups)
  .post(reqReceived, protectedRoute, staffValidator, postCheckup);

router
  .route("/:adoptionId/checkup/toCsv")
  .get(reqReceived, convertCheckupsToCsv);

router
  .route("/:adoptionId/checkup/toPdf")
  .get(reqReceived, convertCheckupsToPdf);
module.exports = router;
