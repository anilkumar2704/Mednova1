// src/controllers/nurseController.js
const Nurse = require("../models/nurse");

// Get all nurses
exports.getNurses = async (req, res) => {
    try {
        const nurses = await Nurse.find({ available: true });
        res.json(nurses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new nurse
exports.addNurse = async (req, res) => {
    try {
        const nurse = new Nurse(req.body);
        await nurse.save();
        res.status(201).json(nurse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
