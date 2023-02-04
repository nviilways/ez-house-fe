import { createSlice } from "@reduxjs/toolkit";

export interface ResFilter {
  page: number;
  limit: number;
}

const initialState: ResFilter = {
  page: 1,
  limit: 10,
};

export const filterRes = createSlice({
  name: "filterRes",
  initialState,
  reducers: {
    setPageRes: (state, action) => {
      return { ...state, page: action.payload };
    },
    setLimitRes: (state, action) => {
      return { ...state, limit: action.payload };
    },
  },
});

export const { setPageRes, setLimitRes } = filterRes.actions;
export default filterRes.reducer;
