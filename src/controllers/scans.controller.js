const scan = require("../models/scans.model")
const isNullOrUndefined = require("./utils/isNullOrUndefined.util")
const axios = require("axios")

/**
 * TODO
 * tambah supaya setelah panggil scan.create()
 * akan panggil fungsi getByDCode() dari diseases.model.js
 * d_code = disease.data.data.result
 * lalu ngirim response dengan format (ganti isi res.json())
 * {
 * message: STRING,
 * image_url: STRING,
 * scan_id: STRING,
 * data: {
 *  d_name: STRING,
 *  d_code: STRING,
 *  d_description: STRING,
 *  d_treatment: STRING,
 *  d_category: STRING
 *  }
 * }
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function addScan(req, res) {
    let {image_url} = req.body
    //test
    const IMG_URL = "https://storage.googleapis.com/skinlyze-image-scan/ISIC_0034526.jpg"
    if(isNullOrUndefined(image_url)){
      image_url = IMG_URL
    }
    //test-end
    try{
        const customConfig = {
            headers: {
            'Content-Type': 'application/json'
            }
        };
        const disease = await axios.post("https://skinlyze-ml-249825855363.asia-southeast2.run.app/predict", JSON.stringify({"image_url":image_url}), customConfig)
        console.log({image_url, 'response': disease.data})
        const scan_id = scan.create(image_url, disease.data.data.result) 
        res.status(201).json({ message: "Created" })
    }catch{

    }
}

async function getScan(req, res) {
    const {id} = req.params
    console.log(id)
    const data = await scan.getById(id)
    if(data === undefined || data === null) res.status(404).json({message: "Failed"})
    res.status(200).json({ message: "Success", data });
}

module.exports = {addScan, getScan}