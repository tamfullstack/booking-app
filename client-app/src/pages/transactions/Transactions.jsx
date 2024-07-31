import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Form from "../../components/Form/Form";
import Footer from "../../components/Footer/Footer";
import styles from "./Transactions.module.css";
import { getToken } from "../../ultis/token";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../ultis/formatDate";
import { useSelector } from "react-redux";
import { url } from "../../ultis/url";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
    } else {
      fetch(url + "transaction", {
        method: "GET",
        headers: { Authorization: "Bearer " + getToken() },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }

          return [];
        })
        .then((data) => {
          setTransactions(data);
        })
        .catch((err) => console.log(err));
    }
  }, [navigate, user]);

  console.log(transactions);

  const renderTransactions = () => {
    return transactions.map((transaction, index) => {
      const roomNumbers = transaction.room
        .map((item) => item.roomNumber)
        .join(", ");

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{transaction.hotel.name}</td>
          <td>{roomNumbers}</td>
          <td>
            {formatDate(transaction.dateStart)} -{" "}
            {formatDate(transaction.dateEnd)}
          </td>
          <td>${transaction.price}</td>
          <td>{transaction.payment}</td>
          <td>
            <div
              className={`${styles.status} ${
                styles[transaction.status.toLowerCase()]
              }`}
            >
              {transaction.status}
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <NavBar />
      <div className={`${styles.transaction} container`}>
        <h2>Your Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
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
      </div>
      <Form />
      <Footer />
    </>
  );
}
