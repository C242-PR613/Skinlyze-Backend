const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");


// api key service account dengan role 
// "Firebase Admin SDK Administrator Service Agent"
// dan "Service Account Token Creator"
// file berada di folder src/services
const serviceAccount = require("./hypnotic-pier-442106-c5-firebase-adminsdk-cu7c3-a7e335d026.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore("skinlyze-database");

module.exports = { db };
