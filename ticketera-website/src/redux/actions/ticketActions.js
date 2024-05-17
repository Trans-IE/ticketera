import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getConfigData, getURLFromConfigByName } from '../../helpers/getConfigFunctions';
import { ticketGridDataLoadedRedux } from '../slices/ticketSlice';



export const getTicketsByFilter = (offset, filters, sorting) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllTicketsByFilter");
            const resp = await fetchConToken(url, {
                "titulo": filters.title,
                "causaRaiz": filters.cause,
                "ticketPartner": "",
                "empresaId": filters.company === '' ? -1 : filters.company,
                "productoId": filters.product === '' ? -1 : filters.product,
                "responsableId": filters.responsible === '' ? -1 : filters.responsible,
                "numeroId": filters.number ? filters.number : -1,
                "prioridad": filters.priority === '' ? -1 : filters.priority,
                "estado": filters.state === '' ? -1 : filters.state,
                "tipoFalla": filters.failType === '' ? -1 : filters.failType,
                "dateFrom": "",
                "dateTo": "",
                "tksinac": "",
                "offset": offset,
                "tipoTicket": filters.type === '' ? -1 : filters.type,
                "orderBy": "",
                "orderByType": "",
                "limit": 25

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

export const createNewTicket = (ticket) => {

    return async (dispatch, getState) => {
        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/createTicket");
            const resp = await fetchConToken(url, {
                "empresaId": ticket.companyId,
                "contratoId": ticket.contractId,
                "productoId": ticket.productId,
                "tipoFalla": ticket.typeId,
                "description": ticket.description,
                "title": ticket.title,
                "nroSerie": ticket.serialNumber ? ticket.serialNumber : "",
                "nodo": ticket.node ? ticket.node : "",
                "esProyecto": ticket.isProject ? 1 : 0,
                "padreId": ticket.asociatedProyectId ? ticket.asociatedProyectId : 0,
                "preventaId": ticket.presaleId ? ticket.presaleId : 0,
                "vendedorId": ticket.vendorId ? ticket.vendedorId : 0,
                "tkEnPartner": ticket.partnerTicket ? ticket.partnerTicket : "",
                "array_user_id_notif": "",
                "responsableId": ticket.responsible
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            console.log('NUEVO', body)
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

export const getTicketStatesByTicketId = (ticketId) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllStatesByTicketId");
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


export const getAllFailTypes = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getFailTypes");
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

export const getAllTicketTypes = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getTicketTypes");
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

export const sendNewNote = (ticketId, note) => {
    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/setNote");
            const resp = await fetchConToken(url, {
                "ticket_id": ticketId,
                "notas": note
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                return body.msg
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

export const sendNewHiddenNote = (ticketId, note) => {
    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/setHiddenNote");
            const resp = await fetchConToken(url, {
                "ticket_id": ticketId,
                "nota": note
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                return body.msg
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