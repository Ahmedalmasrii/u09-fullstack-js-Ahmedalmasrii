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

// Begränsar vilka filtyper som kan laddas upp (endast bilder)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Error: Endast bilder (jpeg, jpg, png, gif) är tillåtna"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 }, // Begränsar filstorleken till 1MB
});

// Felhantering för Multer (större filer än tillåtet etc.)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Filen är för stor. Max 1MB tillåtet." });
    }
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Admin routes - endast admin har tillgång
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
