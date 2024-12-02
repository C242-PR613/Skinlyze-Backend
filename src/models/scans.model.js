const { Timestamp } = require("firebase-admin/firestore");
const firebase = require("../services/firebase.service");
const uuid = require("uuid")

async function getById(id) {
    const disease = firebase.db.collection("scans").doc(id);
    const doc = await disease.get();
    console.log(doc.data())
    if (!doc.exists) {
      console.log("No such document!");
      return;
    } else {
      console.log(doc.data())
    }
    return doc.data();
}

async function create(image_url, disease) {
    const created_at = new Date().toISOString()
    const id = created_at + "_" + uuid.v4()

    const data = {
      "image_url":image_url, 
      "created_at":created_at,  
      "disease": disease
    }
    console.log({id, data})
    const res = await firebase.db.collection("scans").doc(id).set(data)
    console.log("Data added")
    return id
}

async function update() {}

async function remove() {}

module.exports = {
  getById,
  create,
  update,
  remove,
};