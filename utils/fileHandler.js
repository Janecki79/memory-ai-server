const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

async function readMemory(topic) {
  const filePath = path.join(dataDir, `${topic}.txt`);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return ""; // If file doesn't exist yet
  }
}

async function writeMemory(topic, newText) {
  const filePath = path.join(dataDir, `${topic}.txt`);
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}]\n${newText}\n\n`;
  await fs.appendFile(filePath, entry, "utf-8");
}

module.exports = { readMemory, writeMemory };
