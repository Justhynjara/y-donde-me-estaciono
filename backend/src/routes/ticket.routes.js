const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

router.post("/entry", ticketController.vehicleEntry);
router.post("/exit", ticketController.vehicleExit);

module.exports = router;