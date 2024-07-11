const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
// const userModel = require("../models/userModel");

//@desc Register a User
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already regisered");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);
    res.json({ message: "Register the user" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    next(error);
  }
});

//@desc Login a User
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});
//@desc Register a User
//@route GET /api/user/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
