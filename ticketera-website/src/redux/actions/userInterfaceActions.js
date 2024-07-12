import { arrayTabsAddNewRedux, arrayTabsDeleteRedux, editTicketTabShownChangeRedux, mainMenuShownChangeRedux } from "../slices/userInterfaceSlice";

export const editTicketTabShownChange = (index) => {
  return (dispatch, getState) => {

    const { user } = getState().auth;

    dispatch(editTicketTabShownChangeRedux({ tabShown: index }));
  };
};

export const mainMenuShownChange = (index) => {
  return (dispatch, getState) => {

    dispatch(mainMenuShownChangeRedux({ menuShown: index }));
  };
};

export const arrayTabsAddNew = (tabNew) => {
  return (dispatch, getState) => {
    const { arrayTabs } = getState().ui

    //Verificar que la tab no exista
    if (arrayTabs.findIndex(item => item.id === tabNew.id) === -1) {
      dispatch(arrayTabsAddNewRedux(tabNew));
      dispatch(editTicketTabShownChangeRedux({ tabShown: tabNew.index }))
    }
    else {
      dispatch(editTicketTabShownChangeRedux({ tabShown: arrayTabs.findIndex(item => item.id === tabNew.id) }))
    }
    return true;
  };
}

export const arrayTabsClose = (index) => {
  return (dispatch, getState) => {
    dispatch(arrayTabsDeleteRedux({ index }))
  }
}
