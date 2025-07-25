const express = require('express');
const router = express.Router();
const pool = require('../../components/db'); // ✅ now correct


// GET all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos ORDER BY id_prod ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM produtos WHERE id_prod = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar produto por ID:', err);
    res.status(500).json({ error: 'Erro interno ao buscar produto.' });
  }
});

module.exports = router;
