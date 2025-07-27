const express = require("express");
const app = express();
const memoryRoutes = require('./routes/memoryRoutes');

app.use(express.json());
app.use("/", memoryRoutes);

app.get("/status", (req, res) => {
  res.json({ status: "Działa!" });
});

module.exports = app;
