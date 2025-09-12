const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['bike-ambulance', 'doctor-call', 'first-aid', 'fuel', 'mechanic'], default: 'bike-ambulance' },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
    },
    status: { type: String, enum: ['pending', 'accepted', 'on-route', 'arrived', 'completed', 'cancelled'], default: 'pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // driver or nurse
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

serviceRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
