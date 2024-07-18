import { createSlice } from "@reduxjs/toolkit";
import encryptStorage from "../../helpers/storageEncrypter";

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
                console.log('TAB', tabShown)
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
            arrayTabsSetArrayRedux: (state, action) => {
                const { arrayTabs } = action.payload;
                console.log('fede 3');
                state.arrayTabs = arrayTabs;
            },

            arrayTabsAddNewRedux: (state, action) => {

                //    const { newTab } = action.payload;
                state.arrayTabs = state.arrayTabs.concat(action.payload);
            },

            arrayTabsDeleteRedux: (state, action) => {

                const { index } = action.payload;
                const indexToDelete = state.arrayTabs.findIndex(item => item.index === index);
                state.arrayTabs.splice(indexToDelete, 1);
                if (state.arrayTabs.length === 0) {
                    // seteo en vacio el tabs si elimino el unico tab guardado.
                    encryptStorage.setItem("arrayTabs", state.arrayTabs);
                }
            },

        }
    }
);

export const { editTicketTabShownChangeRedux, mainMenuShownChangeRedux, arrayTabsAddNewRedux, arrayTabsDeleteRedux, arrayTabsSetArrayRedux } = userInterfaceSlice.actions;
export default userInterfaceSlice.reducer;