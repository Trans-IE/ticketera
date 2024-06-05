import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { responsibleGridDataLoadedRedux } from "../slices/responsibleSlice";
import { fullNameSorter } from "../../helpers/sorters";

export const getAllResponsibles = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllUsers");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                let arrayCopy = [...body.value];
                arrayCopy.sort(fullNameSorter)
                dispatch(responsibleGridDataLoadedRedux(arrayCopy));
                return arrayCopy
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

export const getResponsiblesByCompany = (companyId, includeSelf) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllUsersByCompany");
            const resp = await fetchConToken(url, {
                "empresaId": companyId,
                "includemyself": includeSelf
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                let arrayCopy = [...body.value];
                arrayCopy.sort(fullNameSorter)
                return arrayCopy
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

export const setTicketResponsible = (ticketId, responsible) => {
    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/setResponsible");
            const resp = await fetchConToken(url, {
                "ticket_id": ticketId,
                "responsable_id": responsible
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                return body.ok
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