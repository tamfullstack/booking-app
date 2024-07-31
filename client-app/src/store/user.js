import { createSlice } from "@reduxjs/toolkit";
import { getToken, removeToken } from "../ultis/token";
import { url } from "../ultis/url";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, { payload }) {
      state.user = payload;
    },
  },
});

const { updateUser } = userSlice.actions;

export const updateUserAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();

      if (token) {
        const res = await fetch(url + "auth", {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (res.status === 200) {
          dispatch(updateUser(data));
        } else {
          removeToken();
          dispatch(updateUser(null));
        }
      } else {
        dispatch(updateUser(null));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const userReducer = userSlice.reducer;

export default userReducer;
