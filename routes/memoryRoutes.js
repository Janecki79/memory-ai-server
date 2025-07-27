const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// ✅ Vercel pozwala pisać tylko do /tmp
const dataDir = '/tmp';

router.post('/zapisz', (req, res) => {
  const { plik, tresc } = req.body;

  if (!plik || !tresc) {
    return res.status(400).json({ error: 'Brakuje pola "plik" lub "tresc"' });
  }

  const filePath = path.join(dataDir, plik);

  fs.writeFile(filePath, tresc, 'utf8', (err) => {
    if (err) {
      console.error('Błąd zapisu:', err);
      return res.status(500).json({ error: 'Błąd zapisu pliku' });
    }

    res.json({ status: 'OK', file: filePath });
  });
});

module.exports = router;
