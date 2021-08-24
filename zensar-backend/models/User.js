const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "must provide name"] },
  Image: { type: String },
  about: {
    type: String,
    required: [true, "must provide some context in 'about'"],
  },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", userSchema);
