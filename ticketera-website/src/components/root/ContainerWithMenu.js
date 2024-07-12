import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { MainMenu, SecondaryMenu, UserMenu } from "./MainMenu";
import Logo from "../../../public/trans.png";
import { Grid } from "@mui/material";
import { mainMenuShownChange } from "../../redux/actions/userInterfaceActions";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { logoutUser } from "../../redux/actions/userActions";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.main,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {},
    }),
  },
}));

export default function ContainerWithMenu({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uiMainMenuShown, editTicketTabShown } = useSelector(
    (state) => state.ui,
    shallowEqual
  );
  const theme = useTheme();

  const mainMenuOnClick = (type, value) => {
    console.log("mainMenuShownChange main", value);
    dispatch(mainMenuShownChange(parseInt(value)));

    //  setTicketsListVisible(!ticketsListVisible);
  };

  const userMenuOnClick = (type, value) => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Esta seguro que desea cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cerrar",
      cancelButtonText: "Cancelar",
      background: theme.palette.background.dark,
      color: theme.palette.text.primary,
      confirmButtonColor: theme.palette.primary.main,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("LOGOUT DE USUARIOS");
        //toast.success('¡Sesión cerrada exitosamente!')
        dispatch(logoutUser());
        navigate("/");
      }
    });
  };

  return (
    <Box sx={{ display: "flex", overflow: "scroll" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={false}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={Logo} style={{ width: "35px" }} />
        </Toolbar>
        <Divider />
        <List
          component="nav"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            {
              <MainMenu
                onClick={mainMenuOnClick}
                optionSelected={uiMainMenuShown}
              />
            }
            <Divider style={{ margin: "8px" }} />
            {SecondaryMenu}
          </div>
          <div>{<UserMenu onClick={userMenuOnClick} />}</div>
        </List>
      </Drawer>

      <Grid
        style={{
          position: "relative",
          height: "100vh",
          width: "calc(100% - 32pxs)",
        }}
      >
        {/* Contenedor para los componentes */}
        {children}
      </Grid>
    </Box>
  );
}
