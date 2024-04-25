import React from "react";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { failTypeGridDataLoadedRedux } from "../slices/failTypeSlice";

export const getAllFailTypes = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getFailTypes");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(failTypeGridDataLoadedRedux(body.value));
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