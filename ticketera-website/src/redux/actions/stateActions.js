import React from "react";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { stateGridDataLoadedRedux } from "../slices/stateSlice";

export const getAllTicketStates = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllStates");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(stateGridDataLoadedRedux(body.value));
                return body
            }
            else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
            console.log("ERROR SIN BODY");
            throw new Error(error.message);
        }

    }
}