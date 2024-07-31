const Hotel = require("../../models/Hotel");
const Room = require("../../models/Room");
const Transaction = require("../../models/Transaction");

exports.getCities = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    const hnHotelNumber = hotels.filter(
      (hotel) => hotel.city === "Ha Noi"
    ).length;
    const hcmHotelNumber = hotels.filter(
      (hotel) => hotel.city === "Ho Chi Minh"
    ).length;
    const dnHotelNumber = hotels.filter(
      (hotel) => hotel.city === "Da Nang"
    ).length;
    const cities = [
      {
        name: "Ha Noi",
        subText: hnHotelNumber + " properties",
        image: "images/HaNoi.jpg",
      },
      {
        name: "Ho Chi Minh",
        subText: hcmHotelNumber + " properties",
        image: "images/HCM.jpg",
      },
      {
        name: "Da Nang",
        subText: dnHotelNumber + " properties",
        image: "images/DaNang.jpg",
      },
    ];
    res.status(200).json(cities);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getTypes = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    const typeNames = ["hotel", "apartment", "resort", "villa", "cabin"];
    const types = [];

    typeNames.forEach((name) => {
      const count = hotels.filter((hotel) => hotel.type === name).length;
      types.push({ name, count });
    });

    res.status(200).json(types);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getHotelsByRating = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    const hotelsByRating = hotels
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    res.status(200).json(hotelsByRating);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.searchHotels = async (req, res, next) => {
  try {
    const { destination } = req.body;
    const roomCount = +req.body.rooms;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const foundHotelsByDestination = await Hotel.find({
      city: destination.trim(),
    });
    const rooms = await Room.find();
    const transactions = await Transaction.find();

    const foundHotels = foundHotelsByDestination.filter((hotelItem) => {
      let roomsChecking = [];

      hotelItem.rooms.forEach((roomId) => {
        const { roomNumbers } = rooms.find(
          (roomItem) => roomItem._id.toString() === roomId.toString()
        );

        roomNumbers.forEach((roomNumber) => {
          roomsChecking.push({ roomId, roomNumber, isBooked: false });
        });
      });

      const filtedTransactions = transactions.filter((transaction) => {
        const hotelCheck =
          transaction?.hotel.toString() === hotelItem._id.toString();
        const startDateCheck = startDate <= transaction?.dateEnd;
        const endDateCheck = endDate >= transaction?.dateStart;
        return hotelCheck && startDateCheck && endDateCheck;
      });

      if (filtedTransactions.length > 0) {
        filtedTransactions.forEach((transaction) => {
          transaction.room.forEach((roomItem) => {
            const roomsCheckingIndex = roomsChecking.findIndex(
              (checking) =>
                checking.roomNumber === roomItem.roomNumber &&
                checking.roomId.toString() === roomItem.roomId.toString()
            );

            roomsChecking[roomsCheckingIndex].isBooked = true;
          });
        });
      }

      const emptyRoomCount = roomsChecking.filter(
        (checking) => !checking.isBooked
      ).length;

      return emptyRoomCount >= roomCount;
    });

    res.status(200).json(foundHotels);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getHotel = async (req, res, next) => {
  try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      const error = new Error("No result found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(hotel);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
