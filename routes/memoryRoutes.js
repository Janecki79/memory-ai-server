const express = require("express");
const router = express.Router(); // ⬅ TO JEST KLUCZOWE

router.get("/pobierz", (req, res) => {
  const plik = req.query.plik;
  if (!plik) {
    return res.status(400).json({ error: "Brak parametru 'plik'." });
  }

  const folderPath = path.join(__dirname, "pamiec");
  const filePath = path.join(folderPath, plik);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Plik nie istnieje." });
  }

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Błąd odczytu pliku." });
    }
    res.json({ status: "OK", plik, tresc: data });
  });
});

