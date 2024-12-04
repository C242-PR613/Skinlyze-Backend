const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore("skinlyze-database");

module.exports = { db };
