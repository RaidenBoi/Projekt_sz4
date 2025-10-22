const Telepules = require('../models/Telepules');

exports.search = async (req, res) => {
  const keres = req.query.q;
  if (!keres) return res.json([]);
  try {
    const rows = await Telepules.search(keres);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a települések lekérdezésekor.' });
  }
};

exports.getMegyek = async (req, res) => {
  try {
    const rows = await Telepules.getAllMegyek();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a megyék lekérdezésekor.' });
  }
};
