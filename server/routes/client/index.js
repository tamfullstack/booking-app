const { Router } = require("express");

const authRoutes = require("./auth");
const hotelRoutes = require("./hotel");
const roomRoutes = require("./room");
const transactionRoutes = require("./transaction");

const router = Router();

router.use("/auth", authRoutes);
router.use("/hotel", hotelRoutes);
router.use("/room", roomRoutes);
router.use("/transaction", transactionRoutes);

module.exports = router;
