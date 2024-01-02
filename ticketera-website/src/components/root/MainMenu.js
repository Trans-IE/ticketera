import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Tooltip } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/styles';
import { toast } from 'sonner';

export const MainMenu = ({ onClick }) => {


  const onClickTickets = () => {

    onClick("tickets", 1);

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
        <ListItemButton selected onClick={onClickTickets}>
          <ListItemIcon>
            <ConfirmationNumberIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Reportes" arrow placement='right'>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
        </ListItemButton>
      </ Tooltip>

      <Tooltip title="Administracion" arrow placement='right'>
        <ListItemButton>
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

export const UserMenu = () => {
  const theme = useTheme()

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

  return (
    <React.Fragment>
      <Tooltip title="Mi cuenta" arrow placement='right'>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

      <Tooltip title="Cerrar sesion" arrow placement='right'>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  )

};