const { Router } = require("express");

const authRoutes = require("./auth");
const transactionRoutes = require("./transaction");
const hotelRoutes = require("./hotel");
const roomRoutes = require("./room");

const router = Router();

router.use("/auth", authRoutes);
router.use("/transaction", transactionRoutes);
router.use("/hotel", hotelRoutes);
router.use("/room", roomRoutes);

module.exports = router;
