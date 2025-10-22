const db = require('../config/db');

exports.create = async ({ nev, telefon, email, password, telepules, cim, login }) => {
  const sql = `
    INSERT INTO userek
      (NEV, TELEFON, EMAIL, PASSWORD, ID_TELEPULES, CIM, ID_TELEPULES_SZML, CIM_SZML, FUNKCIO, LOGIN, RATIFICAT, CEGNEV)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [nev, telefon, email, password, telepules, cim, telepules, cim, 0, login, '', ''];

  const [result] = await db.query(sql, values);
  return result.insertId;
};
