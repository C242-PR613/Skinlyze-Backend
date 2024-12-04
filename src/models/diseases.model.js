const firebase = require("../services/firebase.service");

async function getByName(name) {
  const disease = firebase.db.collection("diseases");
  const snapshot = await disease.where("name", "==", name).get();
  if (snapshot.empty) {
    console.log("No such document!");
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log({ result: doc.data() });
    });
  }
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
}

async function getById() {}

/**
 * @param {*} DCode
 * @returns
 */
async function getByDCode(DCode) {
  const disease = firebase.db.collection("diseases");
  const snapshot = await disease.where("d_code", "==", DCode).get();
  if (snapshot.empty) {
    console.log("No such document!");
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log({ result: doc.data() });
    });
  }
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
}

async function create() {}

async function update() {}

async function remove() {}

module.exports = {
  getById,
  getByName,
  getByDCode,
  create,
  update,
  remove,
};
