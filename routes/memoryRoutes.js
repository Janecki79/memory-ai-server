const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/zapisz", (req, res) => {
  const { plik, tresc } = req.body;
  if (!plik || !tresc) {
    return res.status(400).json({ error: "Brak pliku lub treści." });
  }

  const folderPath = path.join(__dirname, "pamiec");
  const filePath = path.join(folderPath, plik);

  // Upewnij się, że folder istnieje
  fs.mkdirSync(folderPath, { recursive: true });

  fs.writeFile(filePath, tresc, (err) => {
    if (err) {
      console.error("Błąd zapisu:", err);
      return res.status(500).json({ error: "Błąd zapisu." });
    }
    res.json({ status: "OK", plik, tresc });
  });
});

module.exports = router;
