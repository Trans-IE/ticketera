import React, { useState } from "react";
import { Link } from "react-router-dom";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/agentActions";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AccountCircle from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import ReportingLogo from "../resources/Trans_reporting1.png";

export default function Navbar() {
  const dispatch = useDispatch();

  const [openMyAccount, setOpenMyAccount] = useState(false);
  const { agent } = useSelector((state) => state.auth, shallowEqual);


  //ADMINISTRADOR DE USUARIO 
  const handleMyAccount = () => {
    setOpenMyAccount(true);
  };

  /* MENU REPORTS */

  const [anchorElReports, setAnchorElReports] = React.useState(null);
  const openReports = Boolean(anchorElReports);

  const handleMenuReports = (event) => {
    setAnchorElReports(event.currentTarget);
  };

  const handleMenuReportsClose = () => {
    setAnchorElReports(null);
  };

  /* FIN MENU REPORTS */

  /* MENU ADMINISTRATION */
  const [anchorElAdminSys, setAnchorElAdminSys] = React.useState(null);
  const openAdminSys = Boolean(anchorElAdminSys);

  const handleMenuAdminSys = (event) => {
    setAnchorElAdminSys(event.currentTarget);
  };

  const handleMenuAdminSysClose = () => {
    setAnchorElAdminSys(null);
  };

  /* FIN MENU ADMINISTRATION */

  const handleMenuMyAccountLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography component="h1" variant="h6" className={classes.logo}>
            <img
              src={ReportingLogo}
              alt="Trans Industrias Electronicas S.A."
              width="90"
              height="30"
            />
          </Typography>
          <section className={classes.leftToolbar}>
            <Button
              id="btnReports"
              variant="contained"
              aria-label="reportes disponibles"
              aria-controls="menu-appbar-reports"
              aria-haspopup="true"
              onClick={handleMenuReports}
              color="primary"
              className={classes.navButton}
              endIcon={<ExpandMoreIcon />}
            >
              Reportes
            </Button>
            <Menu
              id="menu-appbar-reports"
              className={classes.menuesAppbarStyle}
              anchorEl={anchorElReports}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openReports}
              onClose={handleMenuReportsClose}
            >
              <MenuItem component={Link} to="/echi">
                Reportes 1
              </MenuItem>
            </Menu>
            <>
              <Button
                id="btnAdmin"
                variant="contained"
                aria-label="administre las entidades"
                aria-controls="menu-appbar-admin-sys"
                aria-haspopup="true"
                onClick={handleMenuAdminSys}
                color="primary"
                className={classes.navButton}
                endIcon={<ExpandMoreIcon />}
              >
                Administración
              </Button>
              <Menu
                id="menu-appbar-admin-sys"
                className={classes.menuesAppbarStyle}
                anchorEl={anchorElAdminSys}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={openAdminSys}
                onClose={handleMenuAdminSysClose}
              >
                <MenuItem component={Link} to="/user">
                  Menu1
                </MenuItem>
              </Menu>
            </>
          </section>
          <section className={classes.rightToolbar}>
            <Tooltip title="Ver cuenta del usuario logueado">
              <IconButton
                edge="end"
                aria-label="cuenta del usuario logueado"
                aria-controls="menu-appbar-myaccount"
                aria-haspopup="true"
                onClick={handleMyAccount}
                color="inherit"
                className={classes.buttonFit}
              >
                <Typography >
                  {agent.username}
                </Typography>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cerrar sesión de usuario">
              <IconButton
                edge="end"
                aria-label="Cerrar sesión"
                aria-haspopup="true"
                onClick={handleMenuMyAccountLogout}
                color="inherit"
                className={classes.buttonFit}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </section>
        </Toolbar>
      </AppBar>
    </div>
  );
}
