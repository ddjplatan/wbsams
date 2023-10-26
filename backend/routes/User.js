const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");
const {
  userValidator,
  adminValidator,
  usernameValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  createUser,
  login,
  logout,
  getUsers,
  getUser,
  deleteUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router
  .route("/")
  .post(reqReceived, userValidator, usernameValidator, createUser)
  .get(reqReceived, protectedRoute, adminValidator, getUsers)
  .delete(reqReceived, protectedRoute, adminValidator, deleteUsers)
  .put(reqReceived, protectedRoute, usernameValidator, updateUser);

router.route("/login").post(reqReceived, login);

router.route("/logout").get(reqReceived, logout);

router
  .route("/:userId")
  .get(reqReceived, protectedRoute, getUser)
  .delete(reqReceived, protectedRoute, adminValidator, deleteUser)
  .put(reqReceived, protectedRoute, usernameValidator, updateUser);

module.exports = router;
