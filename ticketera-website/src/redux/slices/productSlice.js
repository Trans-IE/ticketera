import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsDataList: [],
    brandsDataList: [],
    productsGridDataLoading: false,
}


export const productSlice = createSlice(
    {
        name: "product",
        initialState: initialState,
        reducers: {
            productClearDataRedux: (state, action) => {

                state.productsDataList = [];
            },

            productGridDataLoadedRedux: (state, action) => {

                state.productsDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.productsFilterListSelectedConfirm = state.productsFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.productsGridDataLoading = false;

            },
            brandGridDataLoadedRedux: (state, action) => {
                state.brandsDataList = action.payload;
                state.productsGridDataLoading = false;

            },
            productGridDataLoadingRedux: (state, action) => {
                state.productsGridDataLoading = false;
            },
        }
    }
);

export const { productClearDataRedux, productGridDataLoadedRedux, productGridDataLoadingRedux, brandGridDataLoadedRedux } = productSlice.actions;
export default productSlice.reducer;