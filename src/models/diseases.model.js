const firebase = require("../services/firebase.service");

async function getByName(name) {
  const disease = firebase.db.collection("diseases");
  const snapshot = await disease.where("name", "==", name).get();
  if (snapshot.empty) {
    console.log("No such document!");
    return;
  } else {
    snapshot.forEach((doc) => {
      console.log("Document data:", doc.data());
    });
  }
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getById() {}

async function create() {}

async function update() {}

async function remove() {}

module.exports = {
  getById,
  getByName,
  create,
  update,
  remove,
};
