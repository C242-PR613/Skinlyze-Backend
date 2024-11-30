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
const serviceAccount = require("./skinlyze-dev-firebase-adminsdk.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };
