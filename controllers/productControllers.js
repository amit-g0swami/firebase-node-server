const { db } = require("../config/firebase");

module.exports.get_all_products = async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const productsData = snapshot.docs.map((doc) => doc.data());
    res.json({ products: productsData });
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports.get_shipping_address = async (req, res) => {
  const { uid } = req.body;
  try {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("uid", "==", uid).get();
    if (querySnapshot.empty) {
      console.log("User not found.");
      res.status(404).json({ error: "User not found." });
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const shippingAddress = userData.shippingAddress;
    if (shippingAddress) {
      res.json({ shippingAddress });
    }
  } catch (error) {
    console.error("Error fetching user document: ", error);
    res.status(500).json({ error: "Failed to fetch user document" });
  }
};

module.exports.add_shipping_address = async (req, res) => {
  const { uid, shippingAddress } = req.body;
  try {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("uid", "==", uid).get();
    if (querySnapshot.empty) {
      console.log("User not found.");
      res.status(404).json({ error: "User not found." });
    }
    const userDoc = querySnapshot.docs[0];
    await userDoc.ref.update({ shippingAddress });
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error adding shipping address: ", error);
    res.status(500).json({ error: "Failed to add shipping address" });
  }
};
