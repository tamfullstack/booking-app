import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { getToken } from "../../utils/token";
import { url } from "../../utils/url";
import { formatDate } from "../../utils/formatDate";

export default function Transactions() {
  const user = useRouteLoaderData("root");
  const transactions = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const renderTransactions = () => {
    return transactions?.map((transaction) => {
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

  return (
    <>
      <h4 className="app-title">Transactions List</h4>
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
        <tbody>{renderTransactions()}</tbody>
      </table>
    </>
  );
}

export const transactionsLoader = async () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const res = await fetch(url + "transaction", {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    if (res.status === 200) {
      return res;
    }

    return null;
  } catch (error) {
    console.log(error);
  }
};
