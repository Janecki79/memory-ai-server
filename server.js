const express = require("express");
const app = express();
// Serwowanie plików statycznych do GPTs
app.get('/openapi.yaml', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.yaml'));
});

app.get('/.well-known/ai-plugin.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai-plugin.json'));
});

app.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'logo.png'));
});

const path = require("path");
app.use(express.static(path.join(__dirname)));

const memoryRoutes = require('./routes/memoryRoutes');

app.use(express.json());
app.use("/", memoryRoutes);

app.get("/status", (req, res) => {
  res.json({ status: "Działa!" });
});

module.exports = app;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
