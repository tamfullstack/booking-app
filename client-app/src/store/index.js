import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
});

export default store;
