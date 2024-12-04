const scan = require("../models/scans.model");
const diseaseModel = require("../models/diseases.model");
const isNullOrUndefined = require("./utils/isNullOrUndefined.util");
const axios = require("axios");

/**
 * @param {*} req
 * @param {*} res
 */
async function addScan(req, res) {
  const type = req.is("application/json");
  if (type === false) {
    res.status(415).json({
      message:
        "Failed, make sure the request Header have Content-Type: application/json",
    });
    return;
  }
  const { image_url } = req.body;

  if (isNullOrUndefined(image_url)) {
    req.status(400).json({ message: "Failed, Bad Request" });
    return;
  }

  try {
    // API request to get disease data
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const diseaseResponse = await axios.post(
      "https://skinlyze-ml-249825855363.asia-southeast2.run.app/predict",
      JSON.stringify({ image_url: image_url }),
      customConfig
    );

    const diseaseData = diseaseResponse.data.data.result;
    console.log({ ml_result: diseaseData });

    // Create scan entry
    const scan_id = await scan.create(image_url, diseaseData);

    // Fetch detailed disease info by d_code
    const diseaseDetails = await diseaseModel.getByDCode(diseaseData);
    console.log({diseaseDetails});

    // Format the response
    res.status(201).json({
      message: "Scan created successfully",
      image_url,
      scan_id,
      data: {
        d_name: diseaseDetails.name,
        d_code: diseaseDetails.d_code,
        d_description: diseaseDetails.description,
        d_treatment: diseaseDetails.treatment,
        d_symptoms: diseaseDetails.symptoms,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getScan(req, res) {
  const { id } = req.params;
  const data = await scan.getById(id);
  if (isNullOrUndefined(data)) {
    res.status(404).json({ message: "Failed" });
  } else {
    res.status(200).json({ message: "Success", data });
  }
}

module.exports = { addScan, getScan };
