import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    // cuenta los tabs activos en la aplicacion
    editTicketTabsCount: 0,
    // mantiene el indice del tab de edicion actualimente en foco
    editTicketTabShown: 0,
    uiMainMenuShown: 1,

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
                state.uiMainMenuShown = 0;
            },

            editTicketTabsCountAddNewRedux: ( state, action ) => {
                state.editTicketTabsCount += 1;
            },

            editTicketTabsCountRemoveRedux: ( state, action ) => {
                state.editTicketTabsCount -= 1;
            },

            editTicketTabNewRedux: (state, action) => {
                const { tabShown } = action.payload;
                state.editTicketTabShown = tabShown;
                // desactivo el menu especificado porque tengo foco
                state.uiMainMenuShown = 0;
            },

            mainMenuShownChangeRedux: (state, action) => {
                const { menuShown } = action.payload;
                state.uiMainMenuShown = menuShown;
                // al aplicar foco en menu, deshabilito opcion seleccionada en tab
                state.editTicketTabShown = 0;
            }

        }
    }
);

export const { editTicketTabShownChangeRedux, editTicketTabsCountAddNewRedux, editTicketTabsCountRemoveRedux, editTicketTabNewRedux, mainMenuShownChangeRedux } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;