const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyA0C9667PF2aLvt-dWSrOfrFosks_OsGic",
  authDomain: "mega-drive-li.firebaseapp.com",
  projectId: "mega-drive-li",
  storageBucket: "mega-drive-li.appspot.com",
  messagingSenderId: "1099094738665",
  appId: "1:1099094738665:web:e7831a2589498522385278",
  measurementId: "G-WGM89YW6SC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = { firebaseApp, db };
