const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const productRoutes = require('./api/products');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello Dani! Backend is alive!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
