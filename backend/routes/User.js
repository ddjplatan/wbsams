const express = require("express");
const router = express.Router();
const protectedRoute = require("../middlewares/auth");
const reqReceived = require("../middlewares/reqReceived");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  // dest: "./public/uploads",
});
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
  .post(
    reqReceived,
    upload.single("img"),
    async (req, res, next) => {
      const upload = await cloudinary.uploader.upload(req.file.path);
      next();
    },
    userValidator,
    usernameValidator,
    createUser
  )
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
