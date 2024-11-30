const disease = require("../models/diseases.model");

async function getDisease(req, res) {
  const name = req.params.name;
  if(name === undefined) res.status(404).json({message: "Failed"})
  const data = await disease.getByName(name);
  res.status(200).json({ message: "Success", data });
}

module.exports = {getDisease};
