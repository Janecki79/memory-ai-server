const express = require('express');
const app = express();
const memoryRoutes = require('./memoryRoutes');

app.use(express.json());
app.use('/', memoryRoutes); // <-- tu podpinamy router

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
