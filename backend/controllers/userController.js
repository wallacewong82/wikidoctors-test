import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc Auth users & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mcr } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    mcr
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mcr: user.MCR,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user & clear token
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSuperAdmin: updatedUser.isSuperAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get all user
// @route GET /api/users
// @access Private/admin
const getUsersAsAdmin = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// @desc update user profile as admin
// @route PUT /api/users/:id
// @access Private/admin
const updateUserProfileAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.middleName = "";
    user.chineseName = "";
    user.dob = new Date();
    user.email = req.body.email || user.email;
    user.idType = false;
    user.idNumber = "";
    user.gender = "";
    user.nationality = "";
    user.countryCode = "";
    (user.phoneNumber = req.body.phoneNumber || user.phoneNumber),
      (user.homeAddress = "");
    user.homePostalCode = "";
    user.isCorporate = false;
    user.isAdmin = Boolean(req.body.isAdmin);
    user.isSuperAdmin= false;
    user.corporateDetails = null;
    const updatedUser = await user.save();
    res
      .status(200)
      .json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc delete user
// @route DELETE /api/users/:id
// @access Private/admin
const deleteUserAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get user by ID
// @route GET /api/users/:id
// @access Private/admin
const getUserAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsersAsAdmin,
  updateUserProfileAsAdmin,
  deleteUserAsAdmin,
  getUserAsAdmin,
};
