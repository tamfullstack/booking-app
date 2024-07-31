import React, { useEffect } from "react";
import RoomForm from "../Layout/RoomForm/RoomForm";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

export default function NewRoom() {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="form-header app-box-shadow">
        <h4 className="app-title">Add New Room</h4>
      </div>
      <RoomForm />
    </>
  );
}
