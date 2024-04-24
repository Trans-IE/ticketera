import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    statesDataList: [],

    statesGridDataLoading: false,
}


export const stateSlice = createSlice(
    {
        name: "state",
        initialState: initialState,
        reducers: {
            stateClearDataRedux: (state, action) => {

                state.statesDataList = [];
            },

            stateGridDataLoadedRedux: (state, action) => {

                state.statesDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.statesFilterListSelectedConfirm = state.statesFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.statesGridDataLoading = false;

            },
            stateGridDataLoadingRedux: (state, action) => {
                state.statesGridDataLoading = false;
            },
        }
    }
);

export const { stateClearDataRedux, stateGridDataLoadedRedux, stateGridDataLoadingRedux } = stateSlice.actions;
export default stateSlice.reducer;