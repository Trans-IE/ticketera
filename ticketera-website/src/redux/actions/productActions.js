import React from "react";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { responsibleGridDataLoadedRedux } from "../slices/responsibleSlice";
import { brandGridDataLoadedRedux, productGridDataLoadedRedux } from "../slices/productSlice";

export const getAllProducts = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllProducts");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(productGridDataLoadedRedux(body.value));
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

export const getAllBrands = () => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllBrands");
            const resp = await fetchConToken(url, {}, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                dispatch(brandGridDataLoadedRedux(body.value));
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

export const getProductsByBrand = (marca_id) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getProductsByBrand");
            const resp = await fetchConToken(url, {
                "marca_id": marca_id
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

export const getBrandsByCompany = (companyId) => {

    return async (dispatch, getState) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getBrandsByCompany");
            const resp = await fetchConToken(url, {
                "company": companyId
            }, 'POST');
            // const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if (body.ok) {
                return body.value
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