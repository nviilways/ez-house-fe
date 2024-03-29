import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/api/apiSlice";
import filterReducer from "./slice/House/houseFilterSlice";
import filterHostReducer from "./slice/House/houseHostSlice";
import userReducer from "./slice/User/userSlice";
import filterTxReducer from "./slice/User/userTxFilSlice";
import filterResReducer from "./slice/Reservation/reservationSlice"

export const store = configureStore({
  reducer: {
    filterHost: filterHostReducer,
    userStore: userReducer,
    filterTx: filterTxReducer,
    filterHouse: filterReducer,
    filterRes: filterResReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
