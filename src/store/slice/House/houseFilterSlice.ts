import { createSlice } from "@reduxjs/toolkit";

export interface IHouseFilter {
  dateIn: string;
  dateOut: string;
  guest: number;
  sortCol: string;
  sortBy: string;
  name: string;
  city: string;
  page: number;
  limit: number;
}

const today = new Date();
const tommorow = new Date(today);
tommorow.setDate(today.getDate() + 1);

const initialState: IHouseFilter = {
  dateIn: today.toISOString().split("T")[0],
  dateOut: tommorow.toISOString().split("T")[0],
  guest: 1,
  sortCol: "name",
  sortBy: "asc",
  name: "",
  city: "",
  page: 1,
  limit: 10,
};

export const filterSlice = createSlice({
  name: "filterHouse",
  initialState,
  reducers: {
    setIn: (state, action) => {
      return { ...state, dateIn: action.payload };
    },
    setOut: (state, action) => {
      return { ...state, dateOut: action.payload };
    },
    setGuest: (state, action) => {
      return { ...state, guest: action.payload };
    },
    setCol: (state, action) => {
      return { ...state, sortCol: action.payload };
    },
    setBy: (state, action) => {
      return { ...state, sortBy: action.payload };
    },
    setName: (state, action) => {
      return { ...state, name: action.payload };
    },
    setCity: (state, action) => {
      return { ...state, city: action.payload };
    },
    setPage: (state, action) => {
      return { ...state, page: action.payload };
    },
    setLimit: (state, action) => {
      return { ...state, limit: action.payload };
    },
  },
});

export const { setIn, setOut, setGuest, setCol, setBy, setName, setCity, setPage, setLimit } =
  filterSlice.actions;
export default filterSlice.reducer;
