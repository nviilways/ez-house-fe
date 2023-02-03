import { createSlice } from "@reduxjs/toolkit";

export interface IHouseHostFilter {
  guest: number;
  sortCol: string;
  sortBy: string;
  name: string;
  city: string;
  page: number;
  limit: number;
}

const initialState: IHouseHostFilter = {
  guest: 1,
  sortCol: "name",
  sortBy: "asc",
  name: "",
  city: "",
  page: 1,
  limit: 10,
};

export const filterHostSlice = createSlice({
  name: "filterHouseHost",
  initialState,
  reducers: {
    setGuestHost: (state, action) => {
      return { ...state, guest: action.payload };
    },
    setColHost: (state, action) => {
      return { ...state, sortCol: action.payload };
    },
    setByHost: (state, action) => {
      return { ...state, sortBy: action.payload };
    },
    setNameHost: (state, action) => {
      return { ...state, name: action.payload };
    },
    setCityHost: (state, action) => {
      return { ...state, city: action.payload };
    },
    setPageHost: (state, action) => {
      return { ...state, page: action.payload };
    },
    setLimitHost: (state, action) => {
      return { ...state, limit: action.payload };
    },
  },
});

export const { setGuestHost, setColHost, setByHost, setNameHost, setCityHost, setPageHost, setLimitHost } =
  filterHostSlice.actions;
export default filterHostSlice.reducer;
