const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode and verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      // Fetch the user by decoded ID, excluding password from selection
      req.user = await User.findById(decoded.user_id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      next();
    } catch (error) {
      console.error(`Token verification failed: ${error.message}`);
      res.status(401).json({ error: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token provided" });
  }
});

module.exports = { protect };
