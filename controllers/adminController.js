const pool = require('../config/db.js');

// ⚙️ SQL parancs végrehajtása
const executeSql = async (req, res) => {
  const { sql } = req.body;

  if (!sql || !sql.trim()) {
    return res.status(400).json({ success: false, error: "Üres SQL parancs!" });
  }

  try {
    console.log(`🔍 SQL végrehajtás: ${sql.substring(0, 100)}...`);
    const [results] = await pool.execute(sql);
    
    if (Array.isArray(results)) {
      console.log(`✅ SELECT sikeres, ${results.length} sor visszaadva`);
      return res.json({ success: true, type: "select", rows: results });
    } else {
      console.log(`✅ MODIFY sikeres:`, results);
      return res.json({ success: true, type: "modify", message: "Parancs lefutott.", details: results });
    }
  } catch (err) {
    console.error(`❌ SQL hiba: ${err.message}`);
    return res.json({ success: false, error: err.message });
  }
};

module.exports = { executeSql };