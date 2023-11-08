const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");

const {
  adminValidator,
  staffValidator,
  petOwnerValidator,
} = require("../middlewares/utils/validators");

const {
  getPets,
  getPet,
  deletePets,
  deletePet,
  updatePet,
  createPet,
  getAdoptedPets,
} = require("../controllers/petController");

router
  .route("/")
  .post(reqReceived, protectedRoute, createPet)
  .get(reqReceived, getPets);
// .delete(reqReceived, protectedRoute, adminValidator, deletePets);

router
  .route("/adoptedPets")
  .get(reqReceived, protectedRoute, staffValidator, getAdoptedPets);

router
  .route("/:petId")
  .get(reqReceived, getPet)
  .put(reqReceived, protectedRoute, staffValidator, updatePet)
  .delete(reqReceived, protectedRoute, staffValidator, deletePet);

module.exports = router;
