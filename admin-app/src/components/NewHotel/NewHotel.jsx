import React, { useEffect } from "react";
import HotelForm from "../Layout/HotelForm/HotelForm";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

export default function NewHotel() {
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
        <h4 className="app-title">Add New Hotel</h4>
      </div>
      <HotelForm />
    </>
  );
}
