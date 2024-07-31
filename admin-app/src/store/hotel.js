import { createSlice } from "@reduxjs/toolkit";
import { url } from "../utils/url";
import { getToken } from "../utils/token";

const initialState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    getHotels(state, { payload }) {
      state.hotels = [...payload];
    },
  },
});

const { getHotels } = hotelSlice.actions;

export const getHotelsAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Could not found token.");
      }

      const res = await fetch(url + "hotel", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        const data = await res.json();
        dispatch(getHotels(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteHotelAction = (hotelId) => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Could not found token.");
      }

      const res = await fetch(url + "hotel", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelId }),
      });

      if (res.status === 201) {
        dispatch(getHotelsAction());
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

const hotelReducer = hotelSlice.reducer;

export default hotelReducer;
