import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { InteractionType } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
/* import Logo from "../resources/logo_multimedia.svg";
 */
const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: "#3DADD9",
  },
}));

export const LoginButtonAuth0 = ({ handlerOnCallback }) => {
  const classes = useStyles();

  const [dataToken, setDataToken] = useState("");
  const [idToken, setIdToken] = useState("");

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    getIdTokenClaims,
    error,
  } = useAuth0();

  /*     const { result, error } = useMsalAuthentication(InteractionType.None, {
        scopes: ["user.read"]
      });
  
   */

  const getToken = async () => {
    const acctoken = await getAccessTokenSilently();

    const claims = await getIdTokenClaims();
    // if you need the raw id_token, you can access it
    // using the __raw property
    const id_token = claims.__raw;

    setDataToken(acctoken);

    setIdToken(id_token);

    return acctoken;
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (error) {
        console.log(error);
        return;
      }

      getToken().then((newidtoken) => {
        if (user) {
          let objCallback = new Object();
          objCallback.username = user.email;
          objCallback.accessToken = newidtoken;

          handlerOnCallback(objCallback);
        }
      });
    }

    return () => {};
  }, [user]);

  const handleSignInAUTH0 = () => {
    loginWithRedirect();
  };

  return (
    <>
     {/*  <img src={Logo} style={{ padding: 10, transform: "scale(0.7)" }} />  */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSignInAUTH0}
        //  disabled={ agent.trim().length === 0}
      >
        Ingresar
      </Button>
    </>
  );
};
