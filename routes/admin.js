// routes/admin.js
const express = require("express");
const { executeSql } = require("../controllers/adminController.js");
const { sendEmailToUser } = require("../controllers/emailController.js");

const router = express.Router();

// POST /api/admin/execute-sql
router.post("/execute-sql", executeSql);

// POST /api/admin/send-email
router.post("/send-email", sendEmailToUser);

module.exports = router;