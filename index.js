// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;

// Carregar variáveis de ambiente
dotenv.config();

// Middleware global
app.use(cors());
app.use(express.json());

// Importar rotas
const productRoutes = require('./api/products');
// Adicione outras rotas quando necessário, como:
// const authRoutes = require('./auth/auth');
// const orderRoutes = require('./orders/orders');

// Rotas
app.use('/api/produtos', productRoutes);

// Endpoint raiz (teste rápido)
app.get('/', (req, res) => {
  res.send('Hello Dani! Backend is alive!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
