const Room = require("../../models/Room");
const Transaction = require("../../models/Transaction");

exports.getRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { hotelId } = req.body;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const room = await Room.findById(roomId);
    const transactions = await Transaction.find({ hotel: hotelId });

    if (!room) {
      const error = new Error("No room found.");
      error.statusCode = 404;
      throw error;
    }

    const { roomNumbers, ...restRoom } = room._doc;
    const checkedRoomNumbers = [];

    roomNumbers.forEach((roomNumber) => {
      checkedRoomNumbers.push({ roomNumber, isBooked: false });
    });

    const filtedTransactions = transactions.filter((transaction) => {
      const startDateCheck = startDate <= transaction?.dateEnd;
      const endDateCheck = endDate >= transaction?.dateStart;
      return startDateCheck && endDateCheck;
    });

    if (filtedTransactions.length > 0) {
      filtedTransactions.forEach((transaction) => {
        transaction.room
          .filter(
            (roomItem) => roomItem.roomId.toString() === roomId.toString()
          )
          .forEach((roomItem) => {
            const checkedRoomNumberIndex = checkedRoomNumbers.findIndex(
              (checkedItem) => checkedItem.roomNumber === roomItem.roomNumber
            );

            checkedRoomNumbers[checkedRoomNumberIndex].isBooked = true;
          });
      });
    }

    const checkedRoom = { ...restRoom, roomNumbers: checkedRoomNumbers };

    res.status(200).json(checkedRoom);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
