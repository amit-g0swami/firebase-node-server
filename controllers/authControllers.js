const { db, firebaseApp } = require("../config/firebase");
const User = require("../models/User");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        await user.updateProfile({
          displayName: name,
        });
        const newUser = new User({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          admin: null,
          cartDetails: [],
          shippingAddress: null,
        });
        newUser.save((error, savedUser) => {
          if (error) {
            console.error("Error saving user to MongoDB:", error);
            res.status(500).json({ error: "Failed to register" });
          } else {
            res.json({ user: savedUser });
          }
        });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        res.status(500).json({ error: "Failed to register" });
      });
  } catch (error) {
    console.error("Register failed: ", error);
    res.status(500).json({ error: "Failed to register" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        res.json({ user });
      });
  } catch (error) {
    console.error("Login failed: ", error);
    res.status(500).json({ error: "Failed to Login" });
  }
};
