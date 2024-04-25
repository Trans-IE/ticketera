import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    // **** variables de grilla de priorities *****
    prioritiesFilterListSelected: [],
    prioritiesFilterListSelectedConfirm: [],

    prioritiesDataList: [],

    prioritiesGridDataLoading: false,
    // bandera para controlar el paginado,
    // determina si aparece o no el boton "siguiente pagina" 
    prioritiesGridDataHasMorePages: false,

}


export const prioritySlice = createSlice(
    {
        name: "priority",
        initialState: initialState,
        reducers: {
            priorityClearDataRedux: (state, action) => {

                state.prioritiesDataList = [];
            },

            priorityGridDataLoadedRedux: (state, action) => {

                state.prioritiesDataList = action.payload;
                // AL OBTENER DATOS DE BUSQUEDA CONFIRMO EL FILTRO ACTUALMENTE UTILIZADO PARA LOS DATOS.
                state.prioritiesFilterListSelectedConfirm = state.prioritiesFilterListSelected;
                // bandera de carga de datos: false ( finalizo la carga)
                state.prioritiesGridDataLoading = false;

            },
            priorityGridDataLoadingRedux: (state, action) => {
                state.prioritiesGridDataLoading = false;
            },

            priorityGridDataHasMorePagesRedux: (state, action) => {
                state.prioritiesGridDataHasMorePages = action.payload;
            },
            // carga de filtros de priorityera
            priorityFilterListSelectedAddNewRedux: (state, action) => {
                state.prioritiesFilterListSelected = state.echiFilterListSelected.concat(
                    action.payload
                )
            },
            priorityFilterListSelectedDeleteRedux: (state, action) => {
                state.priorityFilterListSelected = state.echiFilterListSelected.filter(
                    (item) => item.source !== action.payload.source
                )
            },
        }
    }
);

export const { priorityClearDataRedux, priorityGridDataLoadedRedux, priorityGridDataLoadingRedux, priorityGridDataHasMorePagesRedux, priorityFilterListSelectedAddNewRedux, priorityFilterListSelectedDeleteRedux } = prioritySlice.actions;
export default prioritySlice.reducer;