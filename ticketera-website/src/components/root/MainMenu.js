import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Tooltip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Popover,
  Typography,
} from "@mui/material";

import TableChartIcon from "@mui/icons-material/TableChart";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { mainMenuShownChange } from "../../redux/actions/userInterfaceActions";
import { ThemeContext } from "../..";

export const MainMenu = ({ onClick, optionSelected }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggleExpand = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickMenu = (option) => {
    switch (option) {
      case 0:
        dispatch(mainMenuShownChange(0));
        onClick("Dashboard", option);
        break;
      case 1:
        dispatch(mainMenuShownChange(1));
        onClick("Tickets", option);
        break;
      case 4:
        dispatch(mainMenuShownChange(4));
        onClick("Tables", option);
        handleClose();
        break;
      default:
        break;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Tooltip title="Dashboard" arrow placement="right">
        <Link
          to="/dashboard"
          onClick={() => onClickMenu(0)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton selected={optionSelected === 0}>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
      </Tooltip>

      <Tooltip title="Tickets" arrow placement="right">
        <Link
          to="/tickets"
          onClick={() => onClickMenu(1)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton selected={optionSelected === 1}>
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItemButton>
        </Link>
      </Tooltip>

      <Tooltip title="Tables" arrow placement="right">
        <ListItemButton
          selected={optionSelected === 4 || open}
          onClick={handleToggleExpand}
        >
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Tables" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box>
          <Link
            to="/product"
            onClick={() => onClickMenu(4)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton selected={optionSelected === 4}>
              <ListItemText
                primary={<Typography color="textPrimary">Product</Typography>}
              />
            </ListItemButton>
          </Link>
          <Link
            to="/marca"
            onClick={() => onClickMenu(4)}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton selected={optionSelected === 4}>
              <ListItemText
                primary={<Typography color="textPrimary">Marca</Typography>}
              />
            </ListItemButton>
          </Link>
        </Box>
      </Popover>
    </Box>
  );
};

export const SecondaryMenu = (
  <React.Fragment>
    {/* Aquí podrías agregar otros elementos del menú secundario si es necesario */}
  </React.Fragment>
);

export const UserMenu = ({ onClick }) => {
  const { toggleTheme } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.auth);

  const onClickMenu = (option) => {
    switch (option) {
      case userMenuOptions.LogoutMenu:
        onClick("Cierre de Sesion", option);
        break;
      case userMenuOptions.MyAccountMenu:
        alert(`Usuario logueado: ${user.apellido}, ${user.nombres}`);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Tooltip title="Tema" arrow placement="right">
        <ListItemButton onClick={() => toggleTheme()}>
          <ListItemIcon>
            <LightModeIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Mi cuenta" arrow placement="right">
        <ListItemButton
          onClick={() => onClickMenu(userMenuOptions.MyAccountMenu)}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Cerrar sesión" arrow placement="right">
        <ListItemButton onClick={() => onClickMenu(userMenuOptions.LogoutMenu)}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
};
