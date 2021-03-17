const firebase = require("firebase-admin");

const credentials = require("./middelwares/credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://tasks-b0ef4.firebaseio.com",
});

module.exports = firebase;