import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./BookingForm.module.css";
import Room from "./Room";
import { getToken } from "../../ultis/token";
import { url } from "../../ultis/url";

export default function BookingForm({ hotel }) {
  const { user } = useSelector((state) => state.user);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fullName, setFullName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [cardNumber, setCardNumber] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [payment, setPayment] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");

  const [roomModal, setRoomModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth?mode=login");
    }
  }, [user, navigate]);

  const handleChangeDates = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    setSelectedRooms([]);
    setPrice(0);
    setRoomModal(false);
  };

  const handleChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleChangePayment = (e) => {
    setPayment(e.target.value);
  };

  const selectRooms = (rooms) => {
    setSelectedRooms(rooms);
  };

  const updatePrice = (updatedPrice) => {
    setPrice(updatedPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const transaction = {
      fullName,
      phoneNumber,
      cardNumber,
      email,
      hotel: hotel._id,
      room: selectedRooms,
      dateStart: startDate,
      dateEnd: endDate,
      price,
      payment,
    };

    console.log(transaction);

    try {
      const res = await fetch(url + "transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify(transaction),
      });
      const data = await res.json();

      if (res.status === 201) {
        navigate("/transactions");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleRoomModal = (e) => {
    e.preventDefault();
    setRoomModal(!roomModal);
    setSelectedRooms([]);
    setPrice(0);
  };

  const renderRooms = () => {
    return hotel.rooms.map((roomId) => {
      return (
        <Room
          startDate={startDate}
          endDate={endDate}
          hotelId={hotel._id}
          roomId={roomId}
          key={roomId}
          selectRooms={selectRooms}
          updatePrice={updatePrice}
          selectedRooms={selectedRooms}
          price={price}
        />
      );
    });
  };

  return (
    <form style={{ marginTop: 30 }} onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 0 }}>
          <h3 style={{ marginBottom: 10 }}>Dates</h3>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            onChange={handleChangeDates}
            ranges={[{ startDate, endDate, key: "selection" }]}
          />
        </div>
        <div className={styles["reserve-info"]}>
          <h3>Reserve Info</h3>
          <div className={styles["reserve-info-input"]}>
            <label htmlFor="fullName">Your Full Name:</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={handleChangeFullName}
            />
          </div>
          <div className={styles["reserve-info-input"]}>
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              disabled={true}
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className={styles["reserve-info-input"]}>
            <label htmlFor="phone-number">Your Phone Number:</label>
            <input
              type="text"
              id="phone-number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div className={styles["reserve-info-input"]}>
            <label htmlFor="card-number">Your Identity Card Number:</label>
            <input
              type="text"
              id="card-number"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleChangeCardNumber}
            />
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={toggleRoomModal}>
        Select Rooms
      </button>
      {roomModal && (
        <div style={{ marginTop: 20 }}>
          <h3>Select Rooms</h3>
          <div className={styles["select-rooms"]}>{renderRooms()}</div>
        </div>
      )}
      <h3 style={{ margin: "20px 0 10px" }}>Total Bill: ${price}</h3>
      <div className={styles.submit}>
        <select value={payment} onChange={handleChangePayment}>
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <button type="submit" className="btn-primary">
          Reserve Now
        </button>
        <div className={styles["submit-error"]}>{error}</div>
      </div>
    </form>
  );
}
