import { createSlice } from "@reduxjs/toolkit";
import { url } from "../ultis/url";

const initialState = {
  query: {
    destination: "",
    startDate: new Date(),
    endDate: new Date(),
    adults: 1,
    children: 0,
    rooms: 1,
  },
  searchList: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateQuery(state, { payload }) {
      state.query[payload.key] = payload.value;
    },

    updateResult(state, { payload }) {
      state.searchList = [...payload.searchList];
    },
  },
});

const { updateQuery, updateResult } = searchSlice.actions;

export const updateQueryAction = (key, value) => {
  return (dispatch) => {
    dispatch(updateQuery({ key, value }));
  };
};

export const updateResultAction = (query) => {
  return async (dispatch) => {
    try {
      const res = await fetch(url + "hotel/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });
      let searchList = [];

      if (res.status === 200) {
        const data = await res.json();
        searchList = [...data];
      }

      dispatch(updateResult({ searchList }));
    } catch (err) {
      console.log(err);
    }
  };
};

const searchReducer = searchSlice.reducer;

export default searchReducer;
