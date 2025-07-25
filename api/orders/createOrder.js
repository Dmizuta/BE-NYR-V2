const express = require('express');
const router = express.Router();
const pool = require('../../components/db');

// POST /api/orders → create new draft order
router.post('/', async (req, res) => {
  const {
    client_id,
    user_id,
    price_table,
    season,
    transportadora_id,
    pagamento_tipo,         // Not saved (no matching column)
    pagamento_condicao,
    observacoes
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pedidos 
        (client_id, user_id, price_table, season, transportadora_id, cond_pagamento, observacoes, status, created_at)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
       RETURNING order_id`,
      [
        client_id || null,
        user_id || null,
        price_table || null,
        season || null,
        transportadora_id || null,
        pagamento_condicao || null,
        observacoes || null,
        0 // status = draft
      ]
    );

    res.status(201).json({ order_id: result.rows[0].order_id });
  } catch (err) {
    console.error('Erro ao criar pedido:', err.message);
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
});

module.exports = router;
