import { createSlice } from "@reduxjs/toolkit";
import { url } from "../utils/url";
import { getToken } from "../utils/token";

const initialState = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRooms(state, { payload }) {
      state.rooms = [...payload];
    },
  },
});

const { getRooms } = roomSlice.actions;

export const getRoomsAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        return;
      }

      const res = await fetch(url + "room", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        const data = await res.json();
        dispatch(getRooms(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteRoomAction = (roomId) => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Could not found token.");
      }

      const res = await fetch(url + "room", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId }),
      });

      if (res.status === 201) {
        dispatch(getRoomsAction());
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

const roomReducer = roomSlice.reducer;

export default roomReducer;
