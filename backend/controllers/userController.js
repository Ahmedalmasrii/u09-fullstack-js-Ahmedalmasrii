const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Registrera användare
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage ? `/uploads/${user.profileImage}` : null, // Returnerar korrekt profilbild
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logga in användare
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage
          ? `/uploads/${user.profileImage}`
          : null,
        token,
      });
    } else {
      res.status(401).json({ message: "Fel e-postadress eller lösenord" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Får alla användare (endast för admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta användare" });
  }
};

// Tar bort användare (endast för admin)
const deleteUser = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Du kan inte ta bort dig själv" });
    }
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "Användare borttagen" });
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (error) {
    console.error(error); // Lägg till denna rad för att logga felet
    res.status(500).json({ message: "Kunde inte ta bort användare" });
  }
};

// Hämta användarprofil
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImage: user.profileImage
          ? `/uploads/${user.profileImage}`
          : null, // Returnerar korrekt profilbild
      });
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Uppdatera användarnamn
const updateUserName = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      await user.save();
      res.json({ name: user.name });
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ message: "Serverfel" });
  }
};

// Uppdatera lösenord
const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
      await user.save();
      res.json({ message: "Lösenord uppdaterat" });
    } else {
      res.status(404).json({ message: "Användare hittades inte" });
    }
  } catch (err) {
    res.status(500).json({ message: "Serverfel" });
  }
};

// Uppdatera profilbild
const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }

    // Ta bort tidigare bild om den finns och inte är standardbilden
    if (user.profileImage && user.profileImage !== "default-image-url.png") {
      const previousImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        user.profileImage
      );
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }

    // Spara den nya bildens filnamn
    user.profileImage = req.file.filename; // Spara enbart filnamnet, som multer genererar
    await user.save();

    // Returnera rätt URL till frontend
    const imageUrl = `/uploads/${user.profileImage}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fel vid uppdatering av profilbild" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  getUserProfile,
  updateUserName,
  updatePassword,
  updateProfileImage,
};
