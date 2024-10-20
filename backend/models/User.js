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
      type: String, // Lagra URL eller filväg till profilbilden
      default: "", // Standardvärde om ingen bild är uppladdad
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
