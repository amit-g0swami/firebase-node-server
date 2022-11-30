const { Router } = require("express");
const productController = require("../controllers/productControllers");
const router = Router();

router.get("/products", productController.get_all_products);
router.get("/shipping-address", productController.get_shipping_address);
router.post("/shipping-address", productController.add_shipping_address);

module.exports = router;
