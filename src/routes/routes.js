const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseases.controller");
const scanController = require("../controllers/scans.controller.js");
const uploadController = require("../controllers/upload.controller.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  res.status(200).json({ message: "success" });
});

router.get("/disease/:name", diseaseController.getDisease);

router.get("/scan/:id", scanController.getScan);

router.post("/scan", scanController.addScan);

router.post("/upload", upload.single("image"), uploadController.upload)

module.exports = router;
