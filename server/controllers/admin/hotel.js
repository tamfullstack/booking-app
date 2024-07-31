const { validationResult } = require("express-validator");

const Hotel = require("../../models/Hotel");
const Transaction = require("../../models/Transaction");

exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.addHotel = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheapestPrice,
      photosUrl,
      featured,
      selectedRooms,
    } = req.body;

    const photos = photosUrl.split(",");
    const rooms = selectedRooms.split(",");

    const hotel = new Hotel({
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheapestPrice,
      photos,
      featured,
      rooms,
      rating: 0,
    });

    await hotel.save();
    res.status(201).json({ message: "Added hotel." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.editHotel = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      hotelId,
      name,
      type,
      city,
      address,
      distance,
      title,
      desc,
      cheapestPrice,
      photosUrl,
      featured,
      selectedRooms,
    } = req.body;

    const photos = photosUrl.split(",");
    const rooms = selectedRooms.split(",");

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      const error = Error("No hotel found");
      error.statusCode = 404;
      throw error;
    }

    hotel.name = name;
    hotel.type = type;
    hotel.city = city;
    hotel.address = address;
    hotel.distance = distance;
    hotel.desc = desc;
    hotel.title = title;
    hotel.cheapestPrice = cheapestPrice;
    hotel.featured = featured;
    hotel.photos = [...photos];
    hotel.rooms = [...rooms];

    await hotel.save();
    res.status(201).json({ message: "Edited hotel." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.body;
    const transactions = await Transaction.find({ hotel: hotelId });
    const currentDate = new Date();

    const couldDelete = transactions.every(
      (transaction) => transaction.dateEnd < currentDate
    );

    if (!couldDelete) {
      const error = new Error("Could not delete this hotel.");
      error.statusCode = 403;
      throw error;
    }

    await Hotel.findByIdAndDelete(hotelId);
    res.status(201).json({ message: "Deleted hotel." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
