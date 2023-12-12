import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { InteractionType } from "@azure/msal-browser";
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: "#3DADD9",
  },
}));

export const LoginButtonAzure = ({ handlerOnCallback }) => {
  const classes = useStyles();

  const { instance: azureInstance } = useMsal();

  const AZUREisAuthenticated = useIsAuthenticated();

  const { result, error } = useMsalAuthentication(InteractionType.None, {
    scopes: ["user.read"],
  });

  useEffect(() => {
    if (AZUREisAuthenticated) {
      if (error) {
        console.log(error);
        return;
      }

      if (result) {
        const { idToken, accessToken } = result;
        const { username } = result.account;

        let objCallback = new Object();
        objCallback.username = username;
        objCallback.idToken = idToken;
        objCallback.accessToken = accessToken;

        handlerOnCallback(objCallback);

      }
    }

    return () => {};
  }, [error, result]);

  const handleSignInAZURE = () => {
    azureInstance.loginRedirect({
      scopes: ["user.read"],
    });
  };

  return (
    <>
    {/*   <img src={Logo} style={{ padding: 10, transform: "scale(0.7)" }} /> */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSignInAZURE}
        //  disabled={ agent.trim().length === 0}
      >
        Ingresar
      </Button>
    </>
  );
};
