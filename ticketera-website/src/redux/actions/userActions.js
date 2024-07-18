import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import { getConfigData, getURLFromConfigByName } from '../../helpers/getConfigFunctions';
import encryptStorage from '../../helpers/storageEncrypter';
import { authCheckingFinishRedux, authConfigLoadedRedux, authLoginRedux, authLogoutRedux } from '../slices/userSlice';

export const startChecking = (afterCheckingPath = "", history) => {
  return async (dispatch, getState) => {

    const token = encryptStorage.getItem('token') || '';

    const { config } = getState().auth;

    if (token) {
      //  console.log("hay token ", token );
      let url = getURLFromConfigByName(config, "api_gateway_host", "auth/renew");
      const resp = await fetchConToken(url);
      const body = await resp.json();

      if (body.ok) {
        const { token, user } = body.value;
        encryptStorage.setItem('token', token);
        encryptStorage.setItem('token-init-date', new Date().getTime());

        /*         let tmpArrayTabs = encryptStorage.getItem("arrayTabs");
                arrayTabsSetArrayRedux(tmpArrayTabs);
         */
        await dispatch(authLoginRedux({
          user: user
        }))
        if (afterCheckingPath !== "") {
          history.replace(afterCheckingPath);
        }
        return true;
      } else {
        dispatch(authCheckingFinishRedux());

        return false;
      }
    } else {
      dispatch(authCheckingFinishRedux());
      return false;
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    try {
      const theme = encryptStorage.getItem('theme')
      encryptStorage.clear();
      encryptStorage.setItem('theme', theme)
      dispatch(authLogoutRedux());

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const loadConfigData = () => {
  return async (dispatch) => {
    const resp = await getConfigData();
    const data = await resp.json();

    try {
      dispatch(authConfigLoadedRedux({ config: data }));
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch, getState) => {

    console.log(`datos: ${username} - ${password}`);
    try {
      const { config } = getState().auth;
      let urlBD = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "auth/login"
      );
      const resp = await fetchSinToken(
        urlBD,
        { username, password },
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        const { user, token } = body.value;
        console.log("almaceno token : ", token);
        encryptStorage.setItem('token', token)
        encryptStorage.setItem('token-init-date', new Date().getTime());
        dispatch(authLoginRedux({ user: user }));
        return user;
      } else {
        if (body.msg?.includes('token')) {
          dispatch(tokenCleanUpError())
        } else {
          throw new Error(body.msg)
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  };
};
