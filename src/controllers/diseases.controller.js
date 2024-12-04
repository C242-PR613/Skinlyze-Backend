const disease = require("../models/diseases.model");
const isNullOrUndefined = require("./utils/isNullOrUndefined.util");

async function getDisease(req, res) {
  const name = req.params.name;
  if (isNullOrUndefined(name)) res.status(404).json({ message: "Failed" });
  const data = await disease.getByName(name);
  res.status(200).json({ message: "Success", data });
}

module.exports = { getDisease };
