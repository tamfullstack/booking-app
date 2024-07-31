import React, { useEffect, useState } from "react";
import styles from "./Room.module.css";
import { url } from "../../ultis/url";

export default function Room(props) {
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(url + "room/detail/" + props.roomId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate: props.startDate,
        endDate: props.endDate,
        hotelId: props.hotelId,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        return null;
      })
      .then((data) => {
        setRoom(data);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const handleChangeSelectedRooms = (e, roomNumber) => {
    const checkinDates =
      Math.ceil((props.endDate - props.startDate) / (1000 * 60 * 60 * 24)) + 1;
    const updatedSelectedRooms = [...props.selectedRooms];
    let updatedPrice = props.price;

    if (e.target.checked) {
      updatedSelectedRooms.push({ roomId: props.roomId, roomNumber });
      updatedPrice += room.price * checkinDates;
    } else {
      const selectedRoomIndex = updatedSelectedRooms.findIndex(
        (selectedRoom) =>
          selectedRoom.roomId === props.roomId &&
          selectedRoom.roomNumber === roomNumber
      );
      updatedSelectedRooms.splice(selectedRoomIndex, 1);
      updatedPrice -= room.price * checkinDates;
    }

    props.selectRooms([...updatedSelectedRooms]);
    props.updatePrice(updatedPrice);
  };

  const renderRoomNumbers = () => {
    return room.roomNumbers.map((item) => {
      return (
        <div className={styles["room-number"]} key={item.roomNumber}>
          <label htmlFor={item.roomNumber}>{item.roomNumber}</label>
          {!item.isBooked && (
            <input
              type="checkbox"
              id={item.roomNumber}
              onChange={(e) => {
                handleChangeSelectedRooms(e, item.roomNumber);
              }}
            />
          )}
          {item.isBooked && (
            <input type="checkbox" id={item.roomNumber} disabled={true} />
          )}
        </div>
      );
    });
  };

  return (
    room && (
      <div className={styles["select-room"]}>
        <h4>{room.title}</h4>
        <div className={styles.room}>
          <div className={styles["room-info"]}>
            <div>{room.desc}</div>
            <div className={styles.people}>
              Max people: <b>{room.maxPeople}</b>
            </div>
            <div className={styles.price}>${room.price}</div>
          </div>
          <div className={styles["room-numbers"]}>{renderRoomNumbers()}</div>
        </div>
      </div>
    )
  );
}
