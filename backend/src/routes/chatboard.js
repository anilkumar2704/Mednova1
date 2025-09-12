const express = require("express");
const router = express.Router();

// POST /api/chatbot
router.post("/", (req, res) => {
    const { message } = req.body;

    // simple dummy replies
    let reply = "I'm just a dummy bot 🤖";
    if (message) {
        if (message.toLowerCase().includes("hello")) {
            reply = "Hello! How can I help you today?";
        } else if (message.toLowerCase().includes("help")) {
            reply = "Sure! I can assist you with requests, bookings, or tracking nurses.";
        } else {
            reply = `You said: "${message}". (This is a dummy reply.)`;
        }
    }

    res.json({ reply });
});

module.exports = router;

