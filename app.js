const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Current server hostname is: ${req.hostname}`);
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
})