import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getConfigData, getURLFromConfigByName } from '../../helpers/getConfigFunctions';
import encryptStorage from '../../helpers/storageEncrypter';
import { brandsGetRowsetRedux } from '../slices/entitiesSlice';


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
                dispatch( brandsGetRowsetRedux( body.value ) );
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
