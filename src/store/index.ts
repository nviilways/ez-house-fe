import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/api/apiSlice";
import filterReducer from "./slice/House/houseFilterSlice";
import userReducer from "./slice/User/userSlice";

export const store = configureStore({
  reducer: {
    userStore: userReducer,
    filterHouse: filterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
