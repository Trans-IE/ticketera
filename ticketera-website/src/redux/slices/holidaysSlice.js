import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  holidays: [],
};

const holidaysSlice = createSlice({
  name: "holidays",
  initialState,
  reducers: {
    holidayGetRowsetRedux: (state, action) => {
      state.holidays = action.payload;
    },
    holidayCreateRedux: (state, action) => {
      state.holidays.push(action.payload);
    },
    holidayUpdateRedux: (state, action) => {
      state.holidays = state.holidays.map((holiday) =>
        holiday.id === action.payload.id ? action.payload : holiday
      );
    },
    holidayDeleteRedux: (state, action) => {
      state.holidays = state.holidays.filter(
        (holiday) => holiday.fecha !== action.payload
      );
    },
  },
});

export const {
  holidayGetRowsetRedux,
  holidayCreateRedux,
  holidayUpdateRedux,
  holidayDeleteRedux,
} = holidaysSlice.actions;

export default holidaysSlice.reducer;
