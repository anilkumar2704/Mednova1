// src/controllers/emergencyController.js
exports.callEmergency = async (req, res) => {
    try {
        // Example: log emergency request
        console.log("🚨 Emergency triggered:", req.body);

        // Here you can add:
        // - Send SMS/Email to emergency team
        // - Push notification
        // - Save in DB for tracking

        res.json({ message: "Emergency request sent successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};