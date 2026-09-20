const express = require('express');
const router = express.Router();
const doctorController = require('./doctor.controller');

// Dhyan de: Yahan function ke peeche () nahi lagana hai
router.post('/add', doctorController.addDoctor); 
router.get('/list', doctorController.getAllDoctors);
router.post('/login', doctorController.loginDoctor);
module.exports = router;