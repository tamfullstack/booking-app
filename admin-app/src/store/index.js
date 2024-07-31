import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./hotel";
import roomReducer from "./room";

const store = configureStore({
  reducer: { hotel: hotelReducer, room: roomReducer },
});

export default store;
