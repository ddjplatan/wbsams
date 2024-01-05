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
  adminValidator,
  staffValidator,
} = require("../middlewares/utils/validators");

const {
  postNews,
  getNewss,
  getNews,
  updateNews,
  deleteNews,
  deleteNewss,
} = require("../controllers/newsController");

router
  .route("/")
  .post(
    reqReceived,
    protectedRoute,
    staffValidator,
    async (req, res, next) => {
      if (req.file) {
        const upload = await cloudinary.uploader.upload(req.file.path);
        req.upload = upload;
      } else {
        req.upload === null;
      }
      next();
    },
    postNews
  )
  .get(reqReceived, getNewss)
  .delete(reqReceived, protectedRoute, adminValidator, deleteNewss);

router
  .route("/:newsId")
  .get(reqReceived, getNews)
  .put(reqReceived, protectedRoute, staffValidator, updateNews)
  .delete(reqReceived, protectedRoute, staffValidator, deleteNews);

module.exports = router;
