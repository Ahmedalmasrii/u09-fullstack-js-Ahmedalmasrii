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

    if (user) {
      if (user.isLocked) {
        return res.status(403).json({ message: "Account is locked. Please contact admin." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        user.failedLoginAttempts = 0; // Nollställ misslyckade försök vid lyckad inloggning
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          profileImage: user.profileImage ? `/uploads/${user.profileImage}` : null,
          token,
        });
      } else {
        user.failedLoginAttempts += 1;
        if (user.failedLoginAttempts >= 4) {
          user.isLocked = true;
          await user.save();
          return res.status(403).json({ message: "Account is locked due to multiple failed login attempts." });
        }

        await user.save();
        return res.status(401).json({ message: "Incorrect email or password" });
      }
    } else {
      res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Admin låser upp användare och tilldelar temporärt lösenord
const unlockUserAccount = async (req, res) => {
  const { userId } = req.params;
  const temporaryPassword = Math.random().toString(36).slice(-8); // Genererar ett tillfälligt lösenord

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Användare hittades inte" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(temporaryPassword, salt);
    user.isLocked = false;
    user.failedLoginAttempts = 0;
    user.temporaryPassword = temporaryPassword;

    await user.save();

    res.json({ message: "User account unlocked, temporary password assigned.", temporaryPassword });
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

    // Hantera uppladdad fil
    if (!req.file) {
      return res.status(400).json({ message: "Ingen fil uppladdad" });
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
        try {
          fs.unlinkSync(previousImagePath);
          console.log(`Tidigare bild borttagen: ${previousImagePath}`);
        } catch (unlinkErr) {
          console.error(`Fel vid borttagning av tidigare bild: ${unlinkErr}`);
          // Fortsätt även om borttagningen misslyckas
        }
      }
    }

    // Spara den nya bildens filnamn
    user.profileImage = req.file.filename; // Spara endast filnamnet
    await user.save();

    // Returnera rätt URL till frontend
    const imageUrl = `/uploads/${user.profileImage}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Fel vid uppdatering av profilbild:", error);
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
