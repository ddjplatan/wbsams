const Pet = require("../../models/Pet");
const userValidator = async (req, res, next) => {
  if (!req.body) {
    res.end(
      `Request for path: ${req.protocol} and method: ${req.method} is missing payload`
    );
    return;
  }
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.username ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body.birthday ||
    !req.body.gender ||
    !req.body.address
    // !req.body.img
  ) {
    res
      .status(400)
      .setHeader("Content-Type", "text/plain")
      .json({ success: false, msg: "Missing required fields" });
    return;
  }

  const nameRegex = /^[a-zA-Z\s-]*$/;
  if (
    !nameRegex.test(req.body.firstName) ||
    !nameRegex.test(req.body.lastName)
  ) {
    res
      .status(400)
      .setHeader("Content-Type", "text/plain")
      .json({ success: false, msg: "Invalid name fields" });
    return;
  }
  next();
};

const usernameValidator = async (req, res, next) => {
  if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
    res
      .status(400)
      .setHeader("Content-Type", "text/plain")
      .end("Invalid username");
  } else {
    next();
  }
};

const adminValidator = async (req, res, next) => {
  if (req.user.userType === "admin") {
    next();
  } else {
    res
      .status(403)
      .setHeader("Content-Type", "application/json")
      .json({ success: false, msg: "Unauthorized to access this resource!" });
  }
};

const staffValidator = async (req, res, next) => {
  if (req.user.userType === "admin" || req.user.userType === "staff") {
    next();
  } else {
    res.status(403).setHeader("Content-Type", "application/json").json({
      success: false,
      message: "Unauthorized to access this resource!",
    });
  }
};

const petOwnerValidator = async (req, res, next) => {
  if (req.user.userType === "user") {
    const pet = await Pet.findById(req.params.petId);
    if (pet.newOwner === null) {
      if (pet.previousOwner._id !== req.user.id) {
        res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }
    } else {
      if (pet.newOwner._id !== req.user.id) {
        res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }
    }
  }
  next();
};

module.exports = {
  userValidator,
  usernameValidator,
  adminValidator,
  staffValidator,
  petOwnerValidator,
};
