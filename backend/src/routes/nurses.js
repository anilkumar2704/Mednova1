// src/routes/nurses.js
const express = require("express");
const router = express.Router();
const { getNurses, addNurse } = require("../controllers/nursecontroller");

router.get("/", getNurses);
router.post("/", addNurse);

module.exports = router;


