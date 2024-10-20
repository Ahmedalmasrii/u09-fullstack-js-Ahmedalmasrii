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
const sanitize = require('sanitize-filename');

// Multer-konfiguration för filuppladdning
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Använd absolut sökväg
  },
  filename(req, file, cb) {
    const sanitizedFilename = sanitize(`${Date.now()}_${file.originalname}`);
    cb(null, sanitizedFilename); // Sätter ett unikt och sanitiserat filnamn
  },
});

// Begränsar vilka filtyper som kan laddas upp (endast bilder)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Endast bilder (jpeg, jpg, png, gif) är tillåtna"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Öka till 5MB
});

// Felhantering för Multer (större filer än tillåtet etc.)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "Filen är för stor. Max 5MB tillåtet." });
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
