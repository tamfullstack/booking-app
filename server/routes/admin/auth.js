const { Router } = require("express");

const authController = require("../../controllers/admin/auth");
const isAdmin = require("../../middleware/isAdmin");

const router = Router();

router.post("/", authController.loginAdmin);
router.get("/", isAdmin, authController.getAdminUser);

module.exports = router;
