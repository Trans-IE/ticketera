import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    brandGetRowsetRedux: (state, action) => {
      state.brands = action.payload;
    },
    brandCreateRedux: (state, action) => {
      state.brands = state.brands.concat(action.payload);
    },
    brandUpdateRedux: (state, action) => {
      state.brands = state.brands.map((brand) =>
        brand.id === action.payload.id ? action.payload : brand
      );
    },
    brandDeleteRedux: (state, action) => {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
  },
});

export const {
  brandGetRowsetRedux,
  brandCreateRedux,
  brandUpdateRedux,
  brandDeleteRedux,
} = brandsSlice.actions;
export default brandsSlice.reducer;
