const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Dani! Backend is alive!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
