const express = require('express');
const router = express.Router();
const { bookAppointment, getPatientAppointments,getDoctorAppointments,updateStatus } = require('./appointment.controller');

router.post('/book', bookAppointment);
router.get('/patient/:patientId', getPatientAppointments);


router.get('/doctor/:doctorId', getDoctorAppointments);
router.patch('/status/:appointmentId',updateStatus);
module.exports = router;