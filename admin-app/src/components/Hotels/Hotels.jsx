import React, { useEffect } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteHotelAction, getHotelsAction } from "../../store/hotel";

export default function Hotels() {
  const user = useRouteLoaderData("root");
  const { hotels } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getHotelsAction());
    }
  }, [user, navigate, dispatch]);

  const handleNavigateNewHotel = () => {
    navigate("/new-hotel");
  };

  const handleNavigateEditHotel = (hotelId) => {
    navigate("/edit-hotel/" + hotelId);
  };

  const handleDeleteHotel = (hotelId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteHotelAction(hotelId));
    }
  };

  const renderHotels = () => {
    return hotels?.map((hotel) => {
      return (
        <tr key={hotel._id}>
          <td>{hotel._id}</td>
          <td>{hotel.name}</td>
          <td>{hotel.type}</td>
          <td>{hotel.title}</td>
          <td>{hotel.city}</td>
          <td>
            <button
              className="app-edit-btn"
              onClick={() => {
                handleNavigateEditHotel(hotel._id);
              }}
            >
              Edit
            </button>
            <span> </span>
            <button
              className="app-delete-btn"
              onClick={() => {
                handleDeleteHotel(hotel._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="app-header">
        <h4 className="app-title">Hotels List</h4>
        <button className="app-add-btn" onClick={handleNavigateNewHotel}>
          Add New
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Title</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderHotels()}</tbody>
      </table>
    </>
  );
}
