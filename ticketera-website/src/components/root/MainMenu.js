import React, { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Tooltip } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/styles';
import { toast } from 'sonner';
import { userMenuOptions } from '../../helpers/constants';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { editTicketTabShownChange } from '../../redux/actions/userInterfaceActions';
import { ThemeContext } from '../..';

export const MainMenu = ({ onClick, optionSelected }) => {
  const dispatch = useDispatch();

  const onClickMenu = (option) => {

    switch (option) {
      case 1:
        onClick("Tickets", option);

        break;

      default:
        break;
    }


  }

  const goToTicketList = () => {
    dispatch(editTicketTabShownChange(-1));
  }


  return (
    <React.Fragment>
      <Tooltip title="Dashboard" arrow placement='right'>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Tickets" arrow placement='right'>
        <Link to="/tickets" onClick={() => { goToTicketList() }}>
          <ListItemButton selected={(optionSelected === 1) ? true : false} onClick={() => onClickMenu(1)}>
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </Tooltip>

      <Tooltip title="Reportes" arrow placement='right'>
        <ListItemButton selected={(optionSelected === 2) ? true : false} onClick={() => onClickMenu(2)}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
        </ListItemButton>
      </ Tooltip>

      <Tooltip title="Administracion" arrow placement='right'>
        <ListItemButton selected={(optionSelected === 3) ? true : false} onClick={() => onClickMenu(3)}>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

    </React.Fragment>
  );
}

export const SecondaryMenu = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
    </ListItemButton>
  </React.Fragment>
);

export const UserMenu = ({ onClick, dispatch }) => {
  const { toggleTheme } = useContext(ThemeContext);

  const onClickMenu = (option) => {
    switch (option) {
      case userMenuOptions.LogoutMenu:
        onClick("Cierre de Sesion", option);

        break;

      case userMenuOptions.MyAccountMenu:
        onClick("Mi Cuenta", option);

      default:
        break;
    }
  }

  /* 
    const logout = () => {
  
      Swal.fire({
        title: "¿Cerrar sesión?",
        text: "¿Esta seguro que desea cerrar la sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cerrar",
        cancelButtonText: 'Cancelar',
        background: theme.palette.background.dark,
        color: theme.palette.text.primary,
        confirmButtonColor: theme.palette.primary.main
      }).then((result) => {
        if(result.isConfirmed){
          toast.success('¡Sesión cerrada exitosamente!')
        }
      })
  
    }
   */
  return (
    <React.Fragment>
      <Tooltip title="Tema" arrow placement='right'>
        <ListItemButton onClick={() => toggleTheme()}>
          <ListItemIcon>
            <LightModeIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Mi cuenta" arrow placement='right'>
        <ListItemButton onClick={() => onClickMenu(userMenuOptions.MyAccountMenu)}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Cerrar sesion" arrow placement='right'>
        <ListItemButton onClick={() => onClickMenu(userMenuOptions.LogoutMenu)}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  )

};