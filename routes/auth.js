const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 🔹 Regisztráció, bejelentkezés
router.post('/register', authController.register);
router.post('/verify-code', authController.verifyCode);
router.post('/login', authController.login);

// 🔹 Profil és kijelentkezés
router.get('/me', authController.getProfile);
router.put('/me', authController.updateProfile);
router.post('/logout', authController.logout);

// 🔹 Rendeléskezelés
router.post('/orders', authController.addOrder);
router.get('/orders', authController.getOrders);
router.delete('/orders/:id', authController.deleteOrder);

module.exports = router;

