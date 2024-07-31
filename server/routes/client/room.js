const { Router } = require("express");

const roomController = require("../../controllers/client/room");

const router = Router();

router.post("/detail/:roomId", roomController.getRoom);

module.exports = router;
