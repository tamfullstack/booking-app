const { Router } = require("express");

const hotelController = require("../../controllers/client/hotel");

const router = Router();

router.get("/cities", hotelController.getCities);

router.get("/types", hotelController.getTypes);

router.get("/rating", hotelController.getHotelsByRating);

router.get("/detail/:hotelId", hotelController.getHotel);

router.post("/search", hotelController.searchHotels);

module.exports = router;
