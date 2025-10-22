const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Kategóriák lekérése
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT ID_KATEGORIA, KATEGORIA FROM IT_kategoriak ORDER BY KATEGORIA`);
    res.json(rows);
  } catch(err) {
    console.error('Hiba a kategóriák lekérdezésekor:', err);
    res.status(500).json({ message: 'Hiba a kategóriák betöltésekor' });
  }
});

module.exports = router;
