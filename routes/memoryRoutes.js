const express = require("express");
const router = express.Router();
const { readMemory, writeMemory } = require("../utils/fileHandler");

router.get("/memory/:topic", async (req, res) => {
  const { topic } = req.params;
  try {
    const content = await readMemory(topic);
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: "Failed to read memory." });
  }
});

router.post("/memory/:topic", async (req, res) => {
  const { topic } = req.params;
  const { newText } = req.body;
  try {
    await writeMemory(topic, newText);
    res.json({ message: "Memory updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to write memory." });
  }
});

module.exports = router;
