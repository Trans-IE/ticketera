import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    // mantiene el indice del tab de edicion actualimente en foco
    editTicketTabShown: -1,
    uiMainMenuShown: 1,

    // **** variables de edicion 
    // array de tabs activos en la aplicacion
    arrayTabs: [],

}

export const userInterfaceSlice = createSlice(
    {
        name: "ui",
        initialState: initialState,
        reducers: {
            editTicketTabShownChangeRedux: (state, action) => {
                const { tabShown } = action.payload;
                state.editTicketTabShown = tabShown;
                // desactivo el menu especificado porque tengo foco
                state.uiMainMenuShown = -1;
            },

            mainMenuShownChangeRedux: (state, action) => {
                const { menuShown } = action.payload;
                state.uiMainMenuShown = menuShown;
                // al aplicar foco en menu, deshabilito opcion seleccionada en tab
                state.editTicketTabShown = -1;
            },

            arrayTabsAddNewRedux: ( state, action ) => {

                //    const { newTab } = action.payload;
                    state.arrayTabs = state.arrayTabs.concat( action.payload);
            },
    
            editTicketTabsCountRemoveRedux: ( state, action ) => {
                //    state.arrayTabs -= 1;
            }

        }
    }
);

export const { editTicketTabShownChangeRedux, mainMenuShownChangeRedux, arrayTabsAddNewRedux, editTicketTabsCountRemoveRedux } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;