const disease = require("../models/diseases.model");
const firebase = require("../services/firebase.service");

async function getDisease(req, res) {
  const name = req.params.name;
  const data = await disease.getByName(name);
  res.status(200).json({ message: "success", data });
}

module.exports = { getDisease };
