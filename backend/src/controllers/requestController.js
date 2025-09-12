const ServiceRequest = require("../models/ServiceRequest");

// Save new booking
exports.createBooking = async (req, res) => {
    try {
        const booking = new ServiceRequest(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};