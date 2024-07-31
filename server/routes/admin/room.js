const { Router } = require("express");
const { body } = require("express-validator");

const roomController = require("../../controllers/admin/room");
const isAdmin = require("../../middleware/isAdmin");

const router = Router();

router.get("/", isAdmin, roomController.getRooms);

router.post(
  "/",
  [
    body("title").trim().not().isEmpty(),
    body("desc").trim().not().isEmpty(),
    body("price").custom((value, { req }) => {
      if (+value <= 0) {
        throw new Error("Please enter a number more than 0.");
      }
      return true;
    }),
    body("maxPeople").custom((value, { req }) => {
      if (+value <= 0) {
        throw new Error("Please enter a number more than 0.");
      }
      return true;
    }),
  ],
  isAdmin,
  roomController.addRoom
);

router.put(
  "/",
  [
    body("title").trim().not().isEmpty(),
    body("desc").trim().not().isEmpty(),
    body("price").custom((value, { req }) => {
      if (+value <= 0) {
        throw new Error("Please enter a number more than 0.");
      }
      return true;
    }),
    body("maxPeople").custom((value, { req }) => {
      if (+value <= 0) {
        throw new Error("Please enter a number more than 0.");
      }
      return true;
    }),
  ],
  isAdmin,
  roomController.editRoom
);

router.delete("/", isAdmin, roomController.deleteRoom);

module.exports = router;
