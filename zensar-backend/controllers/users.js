const User = require("../models/User");
const asyncWrapper = require("../middleware/async.js");
const { createCustomError } = require("../errors/custom-error");

// Fetch all existing users
const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Fetch single user
const getUser = asyncWrapper(async (req, res, next) => {
  const { userID: userID } = req.params;
  const user = await User.findOne({ _id: userID });
  if (!user) {
    return next(createCustomError(`No user with userID ${userID}`, 404));
  }
  res.status(200).json({ user });
});

// Create a user
const createUser = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

// Update user details
const updateUserData = asyncWrapper(async (req, res) => {
  const { userID: userID } = req.params;
  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(createCustomError(`No user with userID ${userID}`, 404));
  }
  res.status(200).json({ user });
});

// Remove a user
const deleteUser = asyncWrapper(async (req, res) => {
  const { userID: userID } = req.params;
  const user = await User.findOneAndDelete({ _id: userID });
  if (!user) {
    return next(createCustomError(`No user with userID ${userID}`, 404));
  }
  res.status(200).json({ user });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserData,
  deleteUser,
};
