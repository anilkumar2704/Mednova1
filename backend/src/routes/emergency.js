const express = require("express");
const router = express.Router();
const { callEmergency } = require("../controllers/emergencyController");

router.post("/call", callEmergency);

module.exports = router;
