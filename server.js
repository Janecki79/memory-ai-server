const express = require("express");
const cors = require("cors");
const memoryRoutes = require("./routes/memoryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", memoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Memory AI server is running on port ${PORT}`);
});
