const express = require("express");
const router = express.Router();
const parkingController = require("../controllers/parking.controller");

router.get("/:id/availability", parkingController.getAvailability);

module.exports = router;