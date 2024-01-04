import { arrayTabsAddNewRedux, editTicketTabShownChangeRedux, mainMenuShownChangeRedux } from "../slices/userInterfaceSlice";

export const editTicketTabShownChange = (index) => {
  return  (dispatch, getState) => {

    const { user } = getState().auth;

     dispatch(editTicketTabShownChangeRedux({ tabShown: index }));
  };
};

export const mainMenuShownChange = (index) => {
  return (dispatch, getState) => {
    dispatch(mainMenuShownChangeRedux({ menuShown: index }));
  };
};

export const arrayTabsAddNew = ( tabNew ) => {
  return (dispatch, getState) => {

    // suscribir al usuario al socket si es un tab de ticket con id existente

    dispatch(arrayTabsAddNewRedux(tabNew));
  };
}

