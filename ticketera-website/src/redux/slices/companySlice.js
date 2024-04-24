import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companiesDataList: [],

    companiesGridDataLoading: false,
}


export const companySlice = createSlice(
    {
        name: "company",
        initialState: initialState,
        reducers: {
            companyClearDataRedux: (state, action) => {

                state.companiesDataList = [];
            },

            companyGridDataLoadedRedux: (state, action) => {

                state.companiesDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.companiesFilterListSelectedConfirm = state.companiesFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.companiesGridDataLoading = false;

            },
            companyGridDataLoadingRedux: (state, action) => {
                state.companiesGridDataLoading = false;
            },
        }
    }
);

export const { companyClearDataRedux, companyGridDataLoadedRedux, companyGridDataLoadingRedux } = companySlice.actions;
export default companySlice.reducer;