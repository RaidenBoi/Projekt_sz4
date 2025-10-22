const express = require('express');
const router = express.Router();
const telepulesController = require('../controllers/telepulesController');

router.get('/telepulesek', telepulesController.search);
router.get('/megyek', telepulesController.getMegyek);

module.exports = router;
