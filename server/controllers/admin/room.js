const { validationResult } = require("express-validator");

const Room = require("../../models/Room");
const Hotel = require("../../models/Hotel");
const Transaction = require("../../models/Transaction");

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.editRoom = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { title, price, maxPeople, desc, roomNumbers, hotelId, roomId } =
      req.body;

    if (!roomNumbers.every((item) => item > 0)) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }

    const hotel = await Hotel.findById(hotelId);
    const room = await Room.findById(roomId);

    if (!hotel || !room) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }

    room.title = title;
    room.price = price;
    room.maxPeople = maxPeople;
    room.desc = desc;
    room.roomNumbers = [...roomNumbers];
    await room.save();

    if (!hotel.rooms.includes(room._id)) {
      hotel.rooms.push(room._id);
      await hotel.save();
    }

    res.status(201).json({ message: "Edited room." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.addRoom = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { title, price, maxPeople, desc, roomNumbers, hotelId } = req.body;

    if (!roomNumbers.every((item) => item > 0)) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      throw error;
    }

    const room = new Room({ title, price, maxPeople, desc, roomNumbers });
    const result = await room.save();
    hotel.rooms.push(result._id);
    await hotel.save();

    res.status(201).json({ message: "Added room." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.body;
    const hotels = await Hotel.find();
    const transactions = await Transaction.find();

    const currentDate = new Date();
    const filtedHotels = hotels.filter((hotel) => hotel.rooms.includes(roomId));

    const couldDeleteByHotel = filtedHotels.every(
      (hotel) => hotel.rooms.length > 1
    );

    const couldDeleteByTransaction = transactions
      .filter((transaction) =>
        transaction.room.some((item) => item.roomId === roomId)
      )
      .every((transaction) => transaction.dateEnd < currentDate);

    const couldDelete = couldDeleteByHotel && couldDeleteByTransaction;

    if (!couldDelete) {
      const error = new Error("Could not delete this room.");
      error.statusCode = 403;
      throw error;
    }

    await Room.findByIdAndDelete(roomId);

    for (let i = 0; i < filtedHotels.length; i++) {
      const hotel = await Hotel.findById(filtedHotels[i]._id);

      if (hotel.rooms.length > 1) {
        const index = hotel.rooms.findIndex((id) => id === roomId);
        hotel.rooms.splice(index, 1);
      }

      await hotel.save();
    }

    res.status(201).json({ message: "Deleted room." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
