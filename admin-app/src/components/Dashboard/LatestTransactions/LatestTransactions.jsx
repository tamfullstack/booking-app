import React from "react";
import classes from "./LatestTransactions.module.css";
import { formatDate } from "../../../utils/formatDate";

export default function LatestTransactions({ latestTransactions }) {
  const renderLatestTransactions = () => {
    return latestTransactions?.map((transaction) => {
      const roomNumbers = transaction.room
        .map((item) => item.roomNumber)
        .join(", ");

      return (
        <tr key={transaction._id}>
          <td>{transaction._id}</td>
          <td>{transaction.user.fullName}</td>
          <td>{transaction.hotel.name}</td>
          <td>{roomNumbers}</td>
          <td>
            {formatDate(transaction.dateStart)} -{" "}
            {formatDate(transaction.dateEnd)}
          </td>
          <td>${transaction.price}</td>
          <td>{transaction.payment}</td>
          <td>
            <div className={`status ${transaction.status.toLowerCase()}`}>
              {transaction.status}
            </div>
          </td>
        </tr>
      );
    });
  };

  console.log(latestTransactions);

  return (
    <div className={`${classes["latest-transactions"]} app-box-shadow`}>
      <h4 className="app-title">Lastest Transactions</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderLatestTransactions()}</tbody>
      </table>
    </div>
  );
}
