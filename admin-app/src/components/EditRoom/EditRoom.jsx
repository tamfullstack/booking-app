import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { getRoomsAction } from "../../store/room";
import RoomForm from "../Layout/RoomForm/RoomForm";

export default function EditRoom() {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const { rooms } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getRoomsAction());
    }
  }, [user, navigate, dispatch]);

  const room = rooms.find((item) => item._id === roomId);

  return (
    <>
      <div className="form-header app-box-shadow">
        <h4 className="app-title">Edit Hotel</h4>
      </div>
      <RoomForm room={room} />
    </>
  );
}
