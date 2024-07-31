import React, { useEffect } from "react";
import { Form, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAction } from "../../../store/hotel";
import { getToken } from "../../../utils/token";
import { url } from "../../../utils/url";

export default function RoomForm(props) {
  const { hotels } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotelsAction());
  }, [dispatch]);

  const renderHotelOptions = () => {
    return hotels.map((hotel) => {
      return (
        <option value={hotel._id} key={hotel._id}>
          {hotel.name}
        </option>
      );
    });
  };

  return (
    <Form method={props.room ? "put" : "post"} className="form app-box-shadow">
      <div className="form-list">
        <div className="form-item">
          <label>Title</label>
          <input
            type="text"
            className="form-input-text"
            name="title"
            defaultValue={props.room && props.room.title}
          />
        </div>
        <div className="form-item">
          <label>Description</label>
          <input
            type="text"
            className="form-input-text"
            name="desc"
            defaultValue={props.room && props.room.desc}
          />
        </div>
        <div className="form-item">
          <label>Price</label>
          <input
            type="number"
            className="form-input-text"
            name="price"
            defaultValue={props.room && props.room.price}
          />
        </div>
        <div className="form-item">
          <label>Max People</label>
          <input
            type="number"
            className="form-input-text"
            name="max-people"
            defaultValue={props.room && props.room.maxPeople}
          />
        </div>
      </div>
      <div className="form-list row-3-col">
        <div className="form-item">
          <label>Rooms</label>
          <textarea
            name="room-numbers"
            defaultValue={props.room && props.room.roomNumbers.join(",")}
            placeholder="give comma between room numbers."
          />
        </div>
        <div className="form-item">
          <label>Choose a hotel</label>
          <select name="hotel-id">{renderHotelOptions()}</select>
        </div>
        <input
          type="hidden"
          name="room-id"
          value={props.room && props.room._id}
        />
        <button className="app-btn">Send</button>
      </div>
    </Form>
  );
}

export const updateRoomAction = async ({ request }) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No token found.");
    }

    const { method } = request;
    const formData = await request.formData();

    const title = formData.get("title");
    const price = +formData.get("price");
    const maxPeople = +formData.get("max-people");
    const desc = formData.get("desc");
    const roomNumbers = formData
      .get("room-numbers")
      .split(",")
      .map((item) => +item);
    const hotelId = formData.get("hotel-id");
    const roomId = formData.get("room-id");
    const room = {
      title,
      price,
      maxPeople,
      desc,
      roomNumbers,
      hotelId,
      roomId,
    };

    const res = await fetch(url + "room", {
      method,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(room),
    });

    if (res.status === 201) {
      return redirect("/rooms");
    } else {
      const data = await res.json();
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message);
    return error;
  }
};
