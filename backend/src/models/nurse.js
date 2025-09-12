// src/models/nurse.js
const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true }, // in years
    available: { type: Boolean, default: true },
    location: { type: String },
    rate: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Nurse", nurseSchema);
