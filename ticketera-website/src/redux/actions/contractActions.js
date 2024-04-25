import React from "react";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { contractGridDataLoadedRedux } from "../slices/contractSlice";

export const getContractsByCompany = (empresa_id) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getContractsByCompany");
            const resp = await fetchConToken(url, {
                "empresa_id": empresa_id
            }, 'POST');
            const body = await resp.json();
            if (body.ok) {
                dispatch(contractGridDataLoadedRedux(body.value));
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