import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Tooltip } from '@mui/material';

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
        <ListItemButton onClick={onClickTickets}>
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

      <Tooltip title="Mi cuenta" arrow placement='right'>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>

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
