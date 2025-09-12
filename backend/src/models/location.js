const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coords: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true } // [lng, lat]
    },
    timestamp: { type: Date, default: Date.now }
});

locationSchema.index({ coords: "2dsphere" });

module.exports = mongoose.model('Location', locationSchema);
