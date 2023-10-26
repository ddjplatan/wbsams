const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postVet,
  getVets,
  getVet,
  updateVet,
  deleteVet,
  deleteVets,
} = require("../controllers/VetController");

router
  .route("/")
  .post(reqReceived, protectedRoute, staffValidator, postVet)
  .get(reqReceived, getVets)
  .delete(reqReceived, protectedRoute, adminValidator, deleteVets);

router
  .route("/:vetId")
  .get(reqReceived, getVet)
  .put(reqReceived, protectedRoute, staffValidator, updateVet)
  .delete(reqReceived, protectedRoute, staffValidator, deleteVet);

module.exports = router;
