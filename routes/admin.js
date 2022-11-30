const { Router } = require("express");
const adminController = require("../controllers/adminControllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.use(authMiddleware);

router.get("/admin/products", adminController.get_all_products);
router.get("/admin/users", adminController.get_all_users);
router.post("/admin/add-product", adminController.add_product);
router.post("/admin/assign-admin-role", adminController.assign_admin_role);

module.exports = router;
