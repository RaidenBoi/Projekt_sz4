const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Feladatok lekérése
router.get('/tasks', userController.getTasks);

// Árajánlat küldése PDF-ben emailen
router.post('/tasks/sendoffer', userController.sendOffer);

// Feladat elutasítása
router.post('/tasks/reject', userController.rejectTask);

// Árajánlat elfogadása linkről
router.get('/tasks/accept/:taskId/:userId', userController.acceptOffer);

// Feladat befejezése, PDF számla küldése
router.post('/tasks/complete', userController.completeTask);

module.exports = router;
