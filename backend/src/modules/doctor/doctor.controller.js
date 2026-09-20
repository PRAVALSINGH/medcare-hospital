const Doctor = require('./doctor.model');
const sendEmail = require('../../utils/sendEmail');
const generatePassword = require('../../utils/generatePassword');
const bcrypt = require('bcryptjs'); // Just in case manually check karna ho

exports.addDoctor = async (req, res, next) => {
  try {
    const { name, email, specialization, experience } = req.body;

    const existingDoctor = await Doctor.findOne({ email: email.toLowerCase().trim() });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const tempPassword = generatePassword();
    
    // 🔥 DEBUG: Registration ke time kya password ban raha hai
    console.log("-----------------------------------------");
    console.log("🆕 REGISTERING NEW DOCTOR");
    console.log("Email:", email);
    console.log("Generated Plain Password:", tempPassword);
    console.log("-----------------------------------------");

    const newDoctor = await Doctor.create({
      name,
      email: email.toLowerCase().trim(),
      password: tempPassword,
      specialization,
      experience
    });

    const emailMessage = `
      <h1>Welcome to MedCare, Dr. ${name}</h1>
      <p>Your Login Credentials:</p>
      <ul>
        <li>Email: ${email}</li>
        <li>Temporary Password: ${tempPassword}</li>
      </ul>
    `;

    await sendEmail({
      email: email,
      subject: "MedCare Hospital - Your Login Credentials",
      message: emailMessage
    });

    return res.status(201).json({ 
      success: true, 
      message: "Doctor added and credentials sent to email" 
    });

  } catch (error) {
    next(error); 
  }
};

exports.getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find().select('-password');
    res.status(200).json(doctors);
};

exports.loginDoctor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // 🔍 DEBUG 1: Frontend se kya aaya
    console.log("-----------------------------------------");
    console.log("🔑 LOGIN ATTEMPT RECEIVED");
    console.log("Input Email:", email);
    console.log("Input Password:", password); 

    // 1. Doctor ko dhundo (yahan hum specifically password ko select kar rahe hain)
    const doctor = await Doctor.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!doctor) {
      console.log("❌ RESULT: Doctor not found in Database");
      console.log("-----------------------------------------");
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    // 🔍 DEBUG 2: DB mein kya mila
    console.log("✅ RESULT: Doctor found in DB");
    console.log("Hashed Password in DB:", doctor.password);

    // 2. Password Match Karo
    const isMatch = await doctor.comparePassword(password);
    
    // 🔍 DEBUG 3: Comparison ka result
    console.log("Comparison Result (isMatch):", isMatch);

    if (!isMatch) {
      console.log("❌ RESULT: Password Mismatch");
      console.log("-----------------------------------------");
      return res.status(401).json({ success: false, message: "Invalid Email or Password" });
    }

    console.log("🚀 RESULT: Login Successful!");
    console.log("-----------------------------------------");

    return res.status(200).json({
      success: true,
      user: {
        id: doctor._id,
        name: doctor.name,
        role: doctor.role || "doctor",
        email: doctor.email
      }
    });

  } catch (error) {
    console.log("💥 CRITICAL ERROR during login:", error.message);
    next(error);
  }
};