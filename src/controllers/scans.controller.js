const scan = require("../models/scans.model")
const predict = require("./ml.controller")
const isNullOrUndefined = require("./utils/isNullOrUndefined.util")

async function addScan(req, res) {
    let {image_url} = req.body
    //test
    const IMG_URL = "https://gardenerspath.com/wp-content/uploads/2019/08/Frogeye-spots-Botryosphaeria-obtusa-on-apple-leaf-FB.jpg"
    if(isNullOrUndefined(image_url)){
      image_url = IMG_URL
    }
    //test-end
    try{
        const disease = await predict(image_url)
        console.log(image_url)
        console.log(disease)
        scan.create(image_url, disease) 
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