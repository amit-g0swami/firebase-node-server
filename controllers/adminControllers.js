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

module.exports.add_product = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const productRef = await db.collection("products").add({
      name,
      price,
      description,
      imageUrl,
    });
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error adding product: ", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

module.exports.get_all_users = async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const usersData = snapshot.docs.map((doc) => doc.data());
    res.json({ users: usersData });
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

module.exports.assign_admin_role = async (req, res) => {
  const { uid, updatedStatus } = req.body;
  try {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef.where("uid", "==", uid).get();
    if (querySnapshot.empty) {
      console.log("User not found.");
      res.status(404).json({ error: "User not found." });
    }
    const userDoc = querySnapshot.docs[0];
    await userDoc.ref.update({ admin: updatedStatus });
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error assigning admin role: ", error);
    res.status(500).json({ error: "Failed to assign admin role" });
  }
};
