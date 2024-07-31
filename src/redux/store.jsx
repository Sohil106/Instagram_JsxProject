import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import profileSliceReducer from "./slices/ProfileSlice";

const store = configureStore({
    reducer: {
      auth: authSliceReducer,
      profile: profileSliceReducer
    },
  });

export default store;
  