const User = require("../../models/User");
const Transaction = require("../../models/Transaction");

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await User.find();
    const transactions = await Transaction.find().populate("hotel user");

    const userCount = users.length;
    const orderCount = transactions.length;
    const earnings = transactions.reduce(
      (total, transaction) => (total += transaction?.price),
      0
    );

    const oldestOrder = transactions.sort(
      (a, b) => a?.createdAt - b?.createdAt
    )[0];
    const oldestDate = oldestOrder?.createdAt;
    const currentDate = new Date();

    const months =
      currentDate.getMonth() -
      oldestDate?.getMonth() +
      1 +
      12 * (currentDate.getFullYear() - oldestDate?.getFullYear());

    const balance = Math.round(earnings / months);

    const info = { userCount, orderCount, earnings, balance };
    const latestTransactions = transactions
      .sort((a, b) => b?.createdAt - a?.createdAt)
      .slice(0, 8);

    res.status(200).json({ info, latestTransactions });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().populate("user hotel");
    res.status(200).json(transactions);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
