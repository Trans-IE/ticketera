import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    responsiblesDataList: [],

    responsiblesGridDataLoading: false,
}


export const responsibleSlice = createSlice(
    {
        name: "responsible",
        initialState: initialState,
        reducers: {
            responsibleClearDataRedux: (state, action) => {

                state.responsiblesDataList = [];
            },

            responsibleGridDataLoadedRedux: (state, action) => {

                state.responsiblesDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.responsiblesFilterListSelectedConfirm = state.responsiblesFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.responsiblesGridDataLoading = false;

            },
            responsibleGridDataLoadingRedux: (state, action) => {
                state.responsiblesGridDataLoading = false;
            },
        }
    }
);

export const { responsibleClearDataRedux, responsibleGridDataLoadedRedux, responsibleGridDataLoadingRedux } = responsibleSlice.actions;
export default responsibleSlice.reducer;