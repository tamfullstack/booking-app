import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { getRoomsAction } from "../../../store/room";
import { url } from "../../../utils/url";
import { getToken } from "../../../utils/token";

export default function HotelForm(props) {
  const { rooms } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getRoomsAction());

      if (props.hotel) {
        setSelectedRooms([...props.hotel.rooms]);
      }
    }
  }, [user, navigate, dispatch, props]);

  const handleToggleRoom = (roomId) => {
    const roomIndex = selectedRooms.findIndex(
      (selectedRoom) => selectedRoom === roomId
    );
    const updatedSelectedRooms = [...selectedRooms];

    if (roomIndex < 0) {
      updatedSelectedRooms.push(roomId);
    } else {
      updatedSelectedRooms.splice(roomIndex, 1);
    }

    setSelectedRooms([...updatedSelectedRooms]);
  };

  const renderRooms = () => {
    return rooms.map((room) => {
      const isSelected = selectedRooms.some(
        (selectedRoom) => selectedRoom === room._id
      );

      const roomOptionClass = "room-option" + (isSelected ? " selected" : "");

      return (
        <div
          className={roomOptionClass}
          key={room._id}
          onClick={() => {
            handleToggleRoom(room._id);
          }}
        >
          {room.title}
        </div>
      );
    });
  };

  return (
    <Form method={props.hotel ? "put" : "post"} className="form app-box-shadow">
      <div className="form-list">
        <div className="form-item">
          <label>Name</label>
          <input
            type="text"
            className="form-input-text"
            name="name"
            defaultValue={props.hotel && props.hotel.name}
          />
        </div>
        <div className="form-item">
          <label>Type</label>
          <input
            type="text"
            className="form-input-text"
            name="type"
            defaultValue={props.hotel && props.hotel.type}
          />
        </div>
        <div className="form-item">
          <label>City</label>
          <input
            type="text"
            className="form-input-text"
            name="city"
            defaultValue={props.hotel && props.hotel.city}
          />
        </div>
        <div className="form-item">
          <label>Address</label>
          <input
            type="text"
            className="form-input-text"
            name="address"
            defaultValue={props.hotel && props.hotel.address}
          />
        </div>
        <div className="form-item">
          <label>Distance from City Center</label>
          <input
            type="number"
            className="form-input-text"
            name="distance"
            defaultValue={props.hotel && props.hotel.distance}
          />
        </div>
        <div className="form-item">
          <label>Title</label>
          <input
            type="text"
            className="form-input-text"
            name="title"
            defaultValue={props.hotel && props.hotel.title}
          />
        </div>
        <div className="form-item">
          <label>Description</label>
          <input
            type="text"
            className="form-input-text"
            name="description"
            defaultValue={props.hotel && props.hotel.desc}
          />
        </div>
        <div className="form-item">
          <label>Price</label>
          <input
            type="number"
            className="form-input-text"
            name="cheapest-price"
            defaultValue={props.hotel && props.hotel.cheapestPrice}
          />
        </div>
        <div className="form-item">
          <label>Images</label>
          <textarea
            name="photos-url"
            defaultValue={props.hotel && props.hotel.photos.join(",")}
            style={{ height: 150 }}
          />
        </div>
        <div className="form-item">
          <label>Featured</label>
          <select
            name="featured"
            defaultValue={props.hotel && (props.hotel.featured ? "yes" : "no")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div className="form-item">
        <label>Rooms</label>
        <div className="room-select">{renderRooms()}</div>
      </div>
      <input
        type="hidden"
        name="selected-rooms"
        value={selectedRooms.join(",")}
      />
      <input
        type="hidden"
        name="hotel-id"
        value={props.hotel && props.hotel._id}
      />
      <button className="app-btn">Send</button>
    </Form>
  );
}

export const updateHotelAction = async ({ request }) => {
  try {
    const { method } = request;
    const formData = await request.formData();

    const name = formData.get("name");
    const type = formData.get("type");
    const address = formData.get("address");
    const city = formData.get("city");
    const title = formData.get("title");
    const distance = +formData.get("distance");
    const cheapestPrice = +formData.get("cheapest-price");
    const desc = formData.get("description");
    const selectedRooms = formData.get("selected-rooms");
    const photosUrl = formData.get("photos-url");
    const featured = formData.get("featured") === "yes";

    const hotelId = formData.get("hotel-id");

    const hotel = {
      hotelId,
      name,
      type,
      address,
      city,
      title,
      distance,
      cheapestPrice,
      desc,
      selectedRooms,
      photosUrl,
      featured,
    };

    const token = getToken();

    if (!token) {
      throw new Error("No token found.");
    }

    const res = await fetch(url + "hotel", {
      method,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotel),
    });

    if (res.status === 201) {
      return redirect("/hotels");
    } else {
      const data = await res.json();
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message);
    return error;
  }
};
