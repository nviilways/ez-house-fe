import { createSlice } from "@reduxjs/toolkit";

export interface TxFilter {
  page: number;
  limit: number;
}

const initialState: TxFilter = {
  page: 1,
  limit: 10,
};

export const filterTx = createSlice({
  name: "filterHouseHost",
  initialState,
  reducers: {
    setPageTx: (state, action) => {
      return { ...state, page: action.payload };
    },
    setLimitTx: (state, action) => {
      return { ...state, limit: action.payload };
    },
  },
});

export const { setPageTx, setLimitTx } = filterTx.actions;
export default filterTx.reducer;
