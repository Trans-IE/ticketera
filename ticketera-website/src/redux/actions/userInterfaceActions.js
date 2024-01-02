import { editTicketTabShownChangeRedux, mainMenuShownChangeRedux } from "../slices/userInterfaceSlice";

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

