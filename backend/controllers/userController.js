const User = require("../models/User");
// const multer = require("multer");
// const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({
//   storage: storage,
// });

const getUsers = async (req, res, next) => {
  const filter = {};
  const options = {
    sort: {
      createdAt: -1,
    },
  };
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  if (Object.keys(req.query).length) {
    // query parameter
    const {
      email,
      username,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      address,
    } = req.query;

    if (email) filter.email = true;
    if (username) filter.username = true;
    if (firstName) filter.firstName = true;
    if (middleName) filter.middleName = true;
    if (lastName) filter.lastName = true;
    if (phoneNumber) filter.phoneNumber = true;
    if (gender) filter.gender = true;
    if (birthday) filter.birthday = true;
    if (jobLevel) filter.jobLevel = true;
    if (address) filter.address = true;

    if (limit) options.limit = limit;
    options.sort = {
      createdAt: -1,
    };
  }

  try {
    const count = await User.countDocuments(filter);
    const users = await User.find(filter, {}, options).skip(skip).limit(limit);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .setHeader("X-Total-Count", `${count}`)
      .json(users);
  } catch (err) {
    throw new Error(`Error retrieving users: ${err.message}`);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).setHeader("Content-Type", "application/json").json(user);
  } catch (err) {
    throw new Error(
      `Error retrieving Users with ID of: ${req.params.userId} ${err.message}`
    );
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, msg: "Deleted all User" });
  } catch (err) {
    throw new Error(`Error retrieving User:${err.message}`);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const options = {
      sort: {
        createdAt: -1,
      },
    };

    const user = await User.findById(req.params.userId);

    // await Session.updateMany(
    //   { learners: user._id },
    //   { $pull: { learners: user._id } }
    // );

    // await Class.updateMany(
    //   { instructor: user._id },
    //   { $pull: { instructor: user._id } }
    // );

    await User.findByIdAndDelete(req.params.userId);
    const users = await User.find({}, {}, options);
    // req.action = `DELETE USER`;
    // req.details = `deleted user: ${user.email}`;
    // next();
  } catch (err) {
    throw new Error(
      `Error deleting Users with ID of: ${req.params.userId} ${err.message}`
    );
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // const user = await User.findOne({ email: req.body.email });

    const update = { ...req.body };
    const updated = await User.findByIdAndUpdate(req.user._id, update, {
      new: true,
    });
    await updated.save();

    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true, message: "message" });
  } catch (err) {
    throw new Error(
      `Error updating User with ID of: ${req.params.userId} ${err.message}`
    );
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .send({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).send({ success: false, message: "User not found" });
  }
  //   if (!user.isVerified) {
  //     // Send email with verification link or code
  //     await sendVerificationLogin(user.email);
  //   }
  //   if (!user.isVerified) {
  //     return res
  //       .status(400)
  //       .json({
  //         success: false,
  //         message:
  //           "You are not verified. Check your email for the verification link",
  //       });
  //   }
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }
  sendTokenResponse(user, 200, res);
};

const logout = async (req, res, next) => {
  console.log("controller");
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .json({ success: true, msg: `Successfully logged out` });
};

const createUser = async (req, res, next) => {
  try {
    // console.log("create user", req.body);
    // console.log("file", req.file);
    const {
      email,
      password,
      username,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      userType,
      address,
    } = req.body;
    const imgPath = req.file
      ? req.file.path.replace("backend/public/", "")
      : "defaults/default-profile.png";
    console.log("imgPath: ", imgPath);
    User.create({
      email,
      password,
      username,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      gender,
      birthday,
      userType,
      address,
      img: imgPath,
    })
      .then((user) => {
        sendTokenResponse(user, 201, res);
      })
      .catch((dbError) => {
        console.error(dbError);
        res.status(500).json({ error: "Database Error" });
      });
    // upload.single("img")(req, res, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ error: "File upload failed" });
    //   }
    //   console.log("body", req.body);
    //   console.log("file", req.file);
    //   const imgPath = req.file
    //     ? req.file.path.replace("backend/public/", "")
    //     : "defaults/default-profile.png";
    //   console.log("imgPath: ", imgPath);
    //   User.create({
    //     email,
    //     password,
    //     username,
    //     firstName,
    //     middleName,
    //     lastName,
    //     phoneNumber,
    //     gender,
    //     birthday,
    //     userType,
    //     address,
    //     img: imgPath,
    //   })
    //     .then((user) => {
    //       sendTokenResponse(user, 201, res);
    //     })
    //     .catch((dbError) => {
    //       console.error(dbError);
    //       res.status(500).json({ error: "Database Error" });
    //     });
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, user });
};

module.exports = {
  login,
  createUser,
  logout,
  getUsers,
  getUser,
  deleteUsers,
  deleteUser,
  updateUser,
};
