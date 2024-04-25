import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contractsDataList: [],

    contractsGridDataLoading: false,
}


export const contractSlice = createSlice(
    {
        name: "contract",
        initialState: initialState,
        reducers: {
            contractClearDataRedux: (state, action) => {

                state.contractsDataList = [];
            },

            contractGridDataLoadedRedux: (state, action) => {

                state.contractsDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.contractsFilterListSelectedConfirm = state.contractsFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.contractsGridDataLoading = false;

            },
            contractGridDataLoadingRedux: (state, action) => {
                state.contractsGridDataLoading = false;
            },
        }
    }
);

export const { contractClearDataRedux, contractGridDataLoadedRedux, contractGridDataLoadingRedux } = contractSlice.actions;
export default contractSlice.reducer;