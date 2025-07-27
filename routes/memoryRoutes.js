const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/pobierz", (req, res) => {
  const filePath = path.join(__dirname, "..", "data", "zdrowie.txt");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    res.send(data);
  } catch (error) {
    res.status(500).send("Błąd podczas odczytu pliku");
  }
});

router.post("/zapisz", (req, res) => {
  const { tresc } = req.body;
  const filePath = path.join(__dirname, "..", "data", "zdrowie.txt");
  try {
    fs.writeFileSync(filePath, tresc, "utf8");
    res.send("Zapisano pomyślnie");
  } catch (error) {
    res.status(500).send("Błąd podczas zapisu pliku");
  }
});

module.exports = router;
