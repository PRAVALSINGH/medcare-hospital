const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  role: { type: String, default: 'doctor' }
}, { timestamps: true });

// ✅ Password Hashing (Aapka logic sahi hai)
doctorSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ✅ LOGIN FIX: Password match karne ke liye ye method zaroori hai
doctorSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Doctor', doctorSchema);