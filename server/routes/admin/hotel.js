const { Router } = require("express");
const { body } = require("express-validator");

const hotelController = require("../../controllers/admin/hotel");
const isAdmin = require("../../middleware/isAdmin");

const router = Router();

router.get("/", isAdmin, hotelController.getHotels);

router.post("/", [
  body("name").trim().not().isEmpty(),
  body("type").trim().not().isEmpty(),
  body("city").trim().not().isEmpty(),
  body("address").trim().not().isEmpty(),
  body("distance").custom((value, { req }) => {
    if (+value <= 0) {
      throw new Error("Please enter a number more than 0.");
    }
    return true;
  }),
  body("title").trim().not().isEmpty(),
  body("desc").trim().not().isEmpty(),
  body("cheapestPrice").custom((value, { req }) => {
    if (+value <= 0) {
      throw new Error("Please enter a number more than 0.");
    }
    return true;
  }),
  body("photosUrl").trim().not().isEmpty(),
  body("selectedRooms").trim().not().isEmpty(),
  isAdmin,
  hotelController.addHotel,
]);

router.put("/", [
  body("name").trim().not().isEmpty(),
  body("type").trim().not().isEmpty(),
  body("city").trim().not().isEmpty(),
  body("address").trim().not().isEmpty(),
  body("distance").custom((value, { req }) => {
    if (+value <= 0) {
      throw new Error("Please enter a number more than 0.");
    }
    return true;
  }),
  body("title").trim().not().isEmpty(),
  body("desc").trim().not().isEmpty(),
  body("cheapestPrice").custom((value, { req }) => {
    if (+value <= 0) {
      throw new Error("Please enter a number more than 0.");
    }
    return true;
  }),
  body("photosUrl").trim().not().isEmpty(),
  body("selectedRooms").trim().not().isEmpty(),
  isAdmin,
  hotelController.editHotel,
]);

router.delete("/", isAdmin, hotelController.deleteHotel);

module.exports = router;
