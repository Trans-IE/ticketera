import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editTicketTabShown: 0,
    uiMainMenuShown: 0,
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
            mainMenuShownChangeRedux: (state, action) => {
                const { menuShown } = action.payload;
                state.uiMainMenuShown = menuShown;
                // al aplicar foco en menu, deshabilito opcion seleccionada en tab
                state.editTicketTabShown = 0;
            }
        }
    }
);

export const { editTicketTabShownChangeRedux, mainMenuShownChangeRedux } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;