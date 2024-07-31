const { validationResult } = require("express-validator");

const Transaction = require("../../models/Transaction");
const User = require("../../models/User");

exports.addTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const {
      fullName,
      phoneNumber,
      email,
      hotel,
      room,
      dateStart,
      dateEnd,
      price,
      payment,
    } = req.body;

    if (room.length === 0) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      throw error;
    }

    const transaction = new Transaction({
      user: req.userId,
      hotel,
      room,
      dateStart,
      dateEnd,
      price,
      payment,
    });
    const result = await transaction.save();

    const user = await User.findById(req.userId);
    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.transactions.push(result._id);
    await user.save();

    res.status(201).json({ message: "Created transaction." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getClientTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).populate(
      "hotel"
    );

    if (transactions.length === 0) {
      const error = new Error("No transaction found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(transactions);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
