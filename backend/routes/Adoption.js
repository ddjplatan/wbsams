const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postAdoption,
  getAdoptions,
  updateAdoption,
  getAdoption,
  deleteAdoption,
  deleteAdoptions,
  postCheckup,
  confirmAdoption,
} = require("../controllers/adoptionController");

router
  .route("/")
  .post(reqReceived, protectedRoute, postAdoption)
  .get(reqReceived, protectedRoute, staffValidator, getAdoptions)
  .delete(reqReceived, protectedRoute, adminValidator, deleteAdoptions);

router
  .route("/:adoptionId")
  .put(reqReceived, protectedRoute, updateAdoption)
  .get(reqReceived, protectedRoute, getAdoption)
  .delete(reqReceived, protectedRoute, staffValidator, deleteAdoption);

router
  .route("/:adoptionId/confirm")
  .post(reqReceived, protectedRoute, staffValidator, confirmAdoption);

router
  .route("/:adoptionId/checkup")
  .post(reqReceived, protectedRoute, staffValidator, postCheckup);
module.exports = router;
