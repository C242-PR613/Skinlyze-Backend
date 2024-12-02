const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseases.controller");
const scanController = require("../controllers/scans.controller.js")

router.get("/", async(req, res) => {
  res.status(200).json({ message: "success", data });
});

router.get("/disease/:name", diseaseController.getDisease);

router.get("/scan/:id", scanController.getScan);

router.post("/scan", scanController.addScan);

module.exports = router;
