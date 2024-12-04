const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require(process.env.DB_PRIVATE_KEY_PATH);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(process.env.DB_NAME);

module.exports = { db };
