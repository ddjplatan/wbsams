const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
  console.log("reached protected route");

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) console.log("Not authorized to access this route!");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json(err.message);
    console.log(`PROTECTED ROUTE: ${err.message}`);
  }
};

module.exports = protectedRoute;
