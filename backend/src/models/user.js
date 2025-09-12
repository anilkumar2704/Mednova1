const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'nurse', 'doctor', 'driver', 'admin'], default: 'patient' },
    createdAt: { type: Date, default: Date.now },
    metadata: { type: Object } // e.g. medical info, vehicle info etc.
});

module.exports = mongoose.model('User', userSchema);
