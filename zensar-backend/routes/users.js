const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUserData,
  deleteUser,
} = require("../controllers/users");

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userID").get(getUser).patch(updateUserData).delete(deleteUser);

module.exports = router;
