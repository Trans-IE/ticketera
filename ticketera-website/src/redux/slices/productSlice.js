import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsDataList: [],
  brandsDataList: [],
  productsGridDataLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    productClearDataRedux: (state, action) => {
      state.productsDataList = [];
    },
    productGridDataLoadedRedux: (state, action) => {
      state.productsDataList = action.payload;
      state.productsGridDataLoading = false;
    },
    brandGridDataLoadedRedux: (state, action) => {
      state.brandsDataList = action.payload;
      state.productsGridDataLoading = false;
    },
    createProductRedux: (state, action) => {
      state.productsDataList.push(action.payload);
    },
    updateProductRedux: (state, action) => {
      const index = state.productsDataList.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productsDataList[index] = action.payload;
      }
    },
    deleteProductRedux: (state, action) => {
      state.productsDataList = state.productsDataList.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  productClearDataRedux,
  productGridDataLoadedRedux,
  brandGridDataLoadedRedux,
  createProductRedux,
  updateProductRedux,
  deleteProductRedux,
} = productSlice.actions;

export default productSlice.reducer;
