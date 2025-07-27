const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

// Główna ścieżka do danych
const dataDir = path.join(process.cwd(), "data");

// Upewniamy się, że folder istnieje
async function ensureDirExists(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error("Błąd tworzenia folderu:", err);
  }
}

// Odczyt pliku z folderu
router.get("/pobierz", async (req, res) => {
  const { plik } = req.query;
  if (!plik) return res.status(400).send("Brak parametru `plik`");

  const filePath = path.join(dataDir, plik);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    res.send(content || "Plik pusty");
  } catch {
    res.status(404).send("Plik nie istnieje");
  }
});

// Zapis/utworzenie pliku
router.post("/zapisz", async (req, res) => {
  const { plik, tresc } = req.body;
  if (!plik || !tresc) return res.status(400).send("Brak `plik` lub `tresc`");

  const filePath = path.join(dataDir, plik);
  try {
    await ensureDirExists(dataDir);
    await fs.appendFile(filePath, `${tresc}\n`, "utf-8");
    res.send("Zapisano dane");
  } catch (err) {
    res.status(500).send("Błąd zapisu");
  }
});

module.exports = router;
