import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getConfigData, getURLFromConfigByName } from '../../helpers/getConfigFunctions';
import { ticketGridDataLoadedRedux } from '../slices/ticketSlice';

export const getTickets = (offset) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllTicketsByFilter");
            const resp = await fetchConToken(url, {
                "pCadenaSearch": "ESTADO:0;TPOESTADO:0;",
                "offset": offset,
                "estadoId": "0",
                "prioridadId": "-1",
                "tipoId": "-1",
                "tipoTicket": "-1",
                "orderBy": "",
                "orderByType": "",
                "limit": "10"

            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(ticketGridDataLoadedRedux(body.value));
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
7
export const getTicketDetail = (ticketId) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getTicketDetail");
            const resp = await fetchConToken(url, {
                "ticket_id": ticketId,
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(ticketGridDataLoadedRedux(body.value));
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

export const getAllTicketStates = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllStates");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
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

export const getTicketMessages = (ticketId) => {
    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getTicketActionByTicketId");
            const resp = await fetchConToken(url, {
                "ticket_id": ticketId
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
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

export const getAllUsersByCompany = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllUsersByCompany");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
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

export const getAllPriorities = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllPrioritys");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
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

export const getAllCompanies = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllCompanies");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
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