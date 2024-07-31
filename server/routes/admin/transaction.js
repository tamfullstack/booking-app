const { Router } = require("express");

const transactionController = require("../../controllers/admin/transaction");
const isAdmin = require("../../middleware/isAdmin");

const router = Router();

router.get("/dashboard", isAdmin, transactionController.getDashboard);

router.get("/", isAdmin, transactionController.getTransactions);

module.exports = router;
