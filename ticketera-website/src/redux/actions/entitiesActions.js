import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getConfigData, getURLFromConfigByName } from '../../helpers/getConfigFunctions';
import encryptStorage from '../../helpers/storageEncrypter';
import { entitiesClearDataRedux, brandGetRowsetRedux, brandCreateRedux, brandUpdateRedux } from '../slices/entitiesSlice';


export const brandGetRowset = () => {

    return async(dispatch, getState ) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "api_gateway_host", "entities/getAllBrands");
            // const resp = await fetchConToken( url, {"offset" : "0", "limit" : "0"}, 'POST' );
            const resp = await fetchConToken( url, {}, 'POST' );
            const body = await resp.json();
            if( body.ok ) 
            {
                dispatch( brandGetRowsetRedux( body.value ) );
            }
            else 
            {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
            console.log("ERROR brandGetRowset SIN BODY");
            throw new Error( error.message );
        }

    }
}

export const brandUpdate = ( brand ) => {
    return async(dispatch, getState ) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "endpoint_host", `entities/updateBrand/${ brand.id }`);
            const resp = await fetchConToken(url, vdn, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
            //    dispatch( vdnUpdatedOK( vdn ) );
                dispatch (brandUpdateRedux(brand));
                return body.msg;
            } else {
                console.log("FALSE BODY ");
                if (body.hasOwnProperty("error")) {
                    throw new Error( body.error.message);
                } else {
                    throw new Error( body.msg) ;
                }
            }

        } catch (error) {
            console.log(error);
            console.log("ERROR brandUpdate SIN BODY");
            throw new Error( error.message );
        }

    }
}

export const brandDelete = ( brand ) => {
    return async(dispatch, getState ) => {

        try {
            const { config } = getState().auth;
            let url = getURLFromConfigByName(config, "endpoint_host", `entities/deleteBrand/${ brand.id }`);
            const resp = await fetchConToken(url, vdn, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
            //    dispatch( vdnUpdatedOK( vdn ) );
                dispatch (brandDelete(brand));
                return body.msg;
            } else {
                console.log("FALSE BODY ");
                if (body.hasOwnProperty("error")) {
                    throw new Error( body.error.message);
                } else {
                    throw new Error( body.msg) ;
                }
            }

        } catch (error) {
            console.log(error);
            console.log("ERROR brandDelete SIN BODY");
            throw new Error( error.message );
        }

    }
}
