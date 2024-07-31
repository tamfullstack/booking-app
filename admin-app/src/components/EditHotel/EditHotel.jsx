import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { getHotelsAction } from "../../store/hotel";
import HotelForm from "../Layout/HotelForm/HotelForm";

export default function EditHotel() {
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();
  const { hotels } = useSelector((state) => state.hotel);
  const dispatch = useDispatch();
  const { hotelId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getHotelsAction());
    }
  }, [dispatch, user, navigate]);

  const hotel = hotels.find((item) => item._id === hotelId);

  return (
    <>
      <div className="form-header app-box-shadow">
        <h4 className="app-title">Edit Hotel</h4>
      </div>
      <HotelForm hotel={hotel} />
    </>
  );
}
