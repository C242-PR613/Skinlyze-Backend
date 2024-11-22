const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseases.controller");

router.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

router.get("/disease/:name", diseaseController.getDisease());

module.exports = router;
