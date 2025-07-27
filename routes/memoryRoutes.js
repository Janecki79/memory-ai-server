const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

router.use(express.json()); // ← TO DODAJ

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
router.post("/zapisz", express.json(), async (req, res) => {
  console.log("REQ.BODY =", req.body);

  const { plik, tresc } = req.body;

  if (!plik || !tresc) {
    return res.status(400).send("Brak wymaganych danych (plik lub tresc)");
  }

const folderPath = dataDir;
  const filePath = path.join(folderPath, plik);

  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    await fs.promises.writeFile(filePath, tresc, "utf-8");
    res.send("Zapisano dane");
  } catch (error) {
    console.error("Błąd zapisu:", error);
    res.status(500).send("Błąd zapisu");
  }
});
