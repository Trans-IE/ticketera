import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    failTypesDataList: [],

    failTypesGridDataLoading: false,
}


export const failTypeSlice = createSlice(
    {
        name: "failType",
        initialState: initialState,
        reducers: {
            failTypeClearDataRedux: (state, action) => {

                state.failTypesDataList = [];
            },

            failTypeGridDataLoadedRedux: (state, action) => {

                state.failTypesDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.failTypesFilterListSelectedConfirm = state.failTypesFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.failTypesGridDataLoading = false;

            },
            failTypeGridDataLoadingRedux: (state, action) => {
                state.failTypesGridDataLoading = false;
            },
        }
    }
);

export const { failTypeClearDataRedux, failTypeGridDataLoadedRedux, failTypeGridDataLoadingRedux } = failTypeSlice.actions;
export default failTypeSlice.reducer;