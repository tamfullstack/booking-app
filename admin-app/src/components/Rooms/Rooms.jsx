import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { deleteRoomAction, getRoomsAction } from "../../store/room";

export default function Rooms() {
  const user = useRouteLoaderData("root");
  const { rooms } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getRoomsAction());
    }
  }, [user, navigate, dispatch]);

  console.log(rooms);

  const handleNavigateAddNewRoom = () => {
    navigate("/new-room");
  };

  const handleNavigateEditRoom = (roomId) => {
    navigate("/edit-room/" + roomId);
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteRoomAction(roomId));
    }
  };

  const renderRooms = () => {
    return rooms?.map((room) => {
      const roomDesc =
        room.desc.length > 50 ? room.desc.slice(0, 50) + "..." : room.desc;

      return (
        <tr key={room._id}>
          <td>{room._id}</td>
          <td>{room.title}</td>
          <td>{roomDesc}</td>
          <td>{room.price}</td>
          <td>{room.maxPeople}</td>
          <td>
            <button
              className="app-edit-btn"
              onClick={() => {
                handleNavigateEditRoom(room._id);
              }}
            >
              Edit
            </button>
            <span> </span>
            <button
              className="app-delete-btn"
              onClick={() => {
                handleDeleteRoom(room._id);
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
        <h4 className="app-title">Rooms List</h4>
        <button className="app-add-btn" onClick={handleNavigateAddNewRoom}>
          Add New
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Max People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderRooms()}</tbody>
      </table>
    </>
  );
}
