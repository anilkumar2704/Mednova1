exports.chatbotReply = async (req, res) => {
    const { message } = req.body;
    // Simple rule-based reply (replace with OpenAI / your AI integration)
    let reply = "Sorry, I didn't get that. Please provide more details.";

    if (!message) return res.status(400).json({ reply });

    const lower = message.toLowerCase();
    if (lower.includes('help') || lower.includes('emergency')) {
        reply = 'If this is an emergency call local emergency services AND press the emergency button in the app. Do you want me to raise a bike ambulance?';
    } else if (lower.includes('where') || lower.includes('track')) {
        reply = 'I can share live tracking once the driver is en-route. Do you want to start tracking?';
    } else {
        reply = 'We received your message. A support agent will respond shortly.';
    }

    res.json({ reply });
};
