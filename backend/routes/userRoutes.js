const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserProfile,
  updateUserName,
  updatePassword,
  updateProfileImage,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// Multer-konfiguration för filuppladdning
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Sparar filerna i 'uploads/' mappen
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Sätter ett unikt filnamn med tidsstämpel
  },
});

// Begränsar vilka filtyper som kan laddas upp (exempelvis bilder)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 }, // Begränsar filstorleken till 1MB
});

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Admin routes - only accessible by admin
router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);

// User profile route
router.get("/profile", protect, getUserProfile);

// Uppdatera användarnamn
router.put("/profile/name", protect, updateUserName);

// Uppdatera lösenord
router.put("/profile/password", protect, updatePassword);

// Ladda upp profilbild
router.put(
  "/profile/image",
  protect,
  upload.single("image"),
  updateProfileImage
);

module.exports = router;
