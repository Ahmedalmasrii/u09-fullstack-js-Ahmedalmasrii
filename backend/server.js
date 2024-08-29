const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Statisk filserver för frontend-filer
app.use(express.static(path.join(__dirname, "../frontend")));

// En enkel route för att hantera hemsidan
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
