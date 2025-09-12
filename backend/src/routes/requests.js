const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/requestController");

router.post("/book", createBooking);

module.exports = router;