const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: "",
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    temporaryPassword: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
