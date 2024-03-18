import React, { useState, useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import clsx from "clsx";
import { loadConfigData, loginUser, startChecking } from "../../redux/actions/userActions";
import { getValueFromConfig } from "../../helpers/getConfigFunctions";
import { PanelOpResultInfo } from "../ui/PanelOpResultInfo";
import LoginTheme from "./LoginTheme";
import { Autocomplete, Box, Button, Container, CssBaseline, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider } from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles, useTheme } from '@mui/styles'

import encryptStorage from "../../helpers/storageEncrypter";
import { Copyright } from "../ui/Copyright";

import { LoginButtonAzure } from "./LoginButtonAzure";
import { LoginButtonAuth0 } from "./LoginButtonAuth0";
import Logo from '../../../public/translogo.png'
import './SignIn.scss'

const useStyles = makeStyles((theme) => ({


  submit: {
    margin: theme.spacing(1, 0, 2),
    background: theme.palette.primary.main,
    color: 'white'
  },

  robotoMediumsz16: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
  },

}));

export const SignIn = () => {
  const theme = useTheme()
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { config } = useSelector((state) => state.auth, shallowEqual);

  let form = {
    agent: "",
    password: ""
  };

  const [formLoginValues, handleLoginInputChange] = useForm(form);

  const [showPassword, setShowPassword] = useState(false);
  const [opResultInfoText, setOpResultInfoText] = useState("");
  const [opResultInfoState, setOpResultInfoState] = useState(0);

  let { agent, password } = formLoginValues;

  /* 
si no esta autenticado debo redireccionar al login.
si esta autenticado debo hacer lo siguiente: 
  1- obtener el idtoken
*/

  const AuthenticationMode = useMemo(
    () => getValueFromConfig(config, "AuthenticationMode"),
    [config]
  );

  useEffect(() => {
    return () => {
      setOpResultInfoText("");
      setOpResultInfoState(0);
    };
  }, []);

  const loginThroughDB = async (e) => {

    if (e) {
      e.preventDefault();
    }

    dispatch(loginUser(agent, password)).then(user => {

      setOpResultInfoState(1);
      setOpResultInfoText("");

      navigate('/');

      /*       dispatch(startChecking()).then((data) => {
              setOpResultInfoState(1);
              setOpResultInfoText("");
              navigate('/');
            }).catch((error) => {
              setOpResultInfoState(3);
              setOpResultInfoText("error: " + (error.message === "Failed to fetch" ? "No es posible conectar en T-WebToolbar." : error.message));
            }); */



    }).catch(error => {
      setOpResultInfoState(3); // estado 3 = error
      setOpResultInfoText(`${error.toString().replaceAll('Error: ', '')}`);
    })
  }

  const EventHandleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePanelInfoOnClose = () => {
    // cierre del panel de informacion
    setOpResultInfoState(0);
    setOpResultInfoText("");
  };

  const OnCallbackAzure = (objCallback) => {
    agent = objCallback.username;
    password = objCallback.accessToken;

    loginThroughDB();
  }


  const OnCallbackAuth0 = (objCallback) => {
    agent = objCallback.username;
    password = objCallback.accessToken;

    loginThroughDB();
  }





  return (
    <ThemeProvider theme={LoginTheme}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', width: '100vw' }}>
        <div style={{ height: '100vh', width: '60%', backgroundColor: theme.palette.background.main, transform: 'skew(-12deg)', paddingLeft: '100px', marginLeft: '-100px', marginRight: '100px' }}>
        </div>
        <div
        style={{marginRight: '50px'}}
          component="main"
          maxWidth="sm"
        >
          <div style={{ backgroundColor: theme.palette.trans.dark, padding: '25px', borderRadius: '20px' }}>


            {
              // SI ES AZURE 
              AuthenticationMode === '0' &&
              <LoginButtonAzure handlerOnCallback={OnCallbackAzure} />

            }

            {
              // SI ES AUTH0
              AuthenticationMode === '3' &&
              <LoginButtonAuth0 handlerOnCallback={OnCallbackAuth0} />

            }

            {(AuthenticationMode !== '0') && (AuthenticationMode !== '3') &&
              <>
                <div style={{ textAlign: 'center' }}>
                  <img src={Logo} style={{ padding: 10, transform: 'scale(0.8)' }} />
                </div>
                <form id="loginAuto" className={classes.formLogin} onSubmit={loginThroughDB} autoComplete="off">
                  <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                    <InputLabel htmlFor="agent">Agente</InputLabel>
                    <OutlinedInput
                      endAdornment={
                        <InputAdornment position="end">
                          <AccountCircle />
                        </InputAdornment>
                      }
                      variant="outlined"
                      margin="normal"
                      required
                      id="agent"
                      color="primary"
                      label="Agente"
                      name="agent"
                      onChange={handleLoginInputChange}
                      value={agent}
                      autoComplete={"off"}
                    />
                  </FormControl>

                  <FormControl variant="outlined" fullWidth className={clsx(classes.loginTextField, classes.robotoMediumsz16)} >
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handleLoginInputChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="visibilizar clave"
                            onMouseEnter={EventHandleShowPassword}
                            onMouseLeave={EventHandleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Clave"
                      autoComplete={"off"}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={opResultInfoState === 1 || agent.trim().length === 0 || password.trim().length === 0}
                  >
                    Ingresar
                  </Button>
                </form>
              </>
            }
            <Box mt={1} pt={0} pb={1}>
              <PanelOpResultInfo
                text={opResultInfoText}
                stateResult={opResultInfoState}
                btnCloseOnClick={handlePanelInfoOnClose}
              />
            </Box>
            <Box mt={1}>
              <Copyright version={"1.0.0"} color='white' />
            </Box>
          </div>
        </div>
      </div>

    </ThemeProvider>

  );
};
