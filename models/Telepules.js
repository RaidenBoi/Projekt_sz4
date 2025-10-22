const db = require('../config/db');

exports.search = async (keres) => {
  const [rows] = await db.query(
    `SELECT t.ID_TELEPULES, t.TELEPULES, t.IRSZAM, m.MEGYE, m.ID_MEGYEK
     FROM telepulesek t
     JOIN megye m ON t.ID_MEGYEK = m.ID_MEGYEK
     WHERE t.TELEPULES LIKE ? 
     ORDER BY t.TELEPULES ASC
     LIMIT 10`,
    [`${keres}%`]  // csak az elejére egyezzen
  );
  return rows;
};


exports.getAllMegyek = async () => {
  const [rows] = await db.query(`SELECT ID_MEGYEK, MEGYE FROM megye ORDER BY MEGYE ASC`);
  return rows;
};