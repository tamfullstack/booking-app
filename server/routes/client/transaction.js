const { Router } = require("express");
const { body } = require("express-validator");

const isAuth = require("../../middleware/isAuth");
const transactionController = require("../../controllers/client/transaction");

const router = Router();

router.post(
  "/",
  [
    body("fullName").trim().not().isEmpty(),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("phoneNumber").trim().not().isEmpty(),
    body("cardNumber").trim().not().isEmpty(),
    body("payment").trim().not().isEmpty(),
    body("room").isArray().notEmpty(),
  ],
  isAuth,
  transactionController.addTransaction
);

router.get("/", isAuth, transactionController.getClientTransactions);

module.exports = router;
