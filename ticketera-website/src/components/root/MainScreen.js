import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { MainMenu, SecondaryMenu, UserMenu } from './MainMenu';
import { TabsScreen } from './TabsScreen';
import { TicketsScreen } from '../ticket/TicketsScreen';
import { Filters } from './Filters';
import Logo from '../../../public/trans.png'
import { TicketDetail } from '../ticket/TicketDetail';
import { TabItem } from './TabItem';
import { Grid } from '@mui/material';

const drawerWidth = 240;

const ComponenteSuperior = () => {
  return (
    <Grid xs={12} sx={{ position: 'absolute', top: 40, left: 10, zIndex: 2, padding: '10px' }}>
      {/* Contenido del componente superior */}
      {/* <p>Componente Superior</p> */}
      {/* <Test /> */}
      <TicketsScreen />
    </Grid>
  );
};

const ComponenteInferior = () => {
  return (
    <Grid xs={12} sx={{ position: 'absolute', top: 0, left: 10, zIndex: 1, padding: '10px' }}>
      {/* Contenido del componente inferior */}
      {/*  <p>Componente Inferior</p> */}
      {/*      <Filters />
            <DataTable /> */}
      <TabsScreen />
    </Grid>
  );
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.main,
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
        },
      }),
    },
  }),
);

export const MainScreen = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [ticketsListVisible, setTicketsListVisible] = useState(false);

  const onClick = (tipo, valor) => {

    setTicketsListVisible(!ticketsListVisible);

  }


  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={false}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={Logo} style={{ width: '35px' }} />
        </Toolbar>
        <Divider />
        <List component="nav" style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <MainMenu onClick={onClick} />
            <Divider style={{ margin: '8px' }} />
            {SecondaryMenu}
          </div>
          <div>
            {<UserMenu />}
          </div>
        </List>
      </Drawer>
      {/*       <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh', 
          overflow: 'auto',
        }}
      > */}


      <Grid xs={12} style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {/* Contenedor para los componentes */}
        <ComponenteInferior />
        <ComponenteSuperior />
      </Grid>

      {/*         {ticketsListVisible ?
          <div style={{ width: '100hf', justifyContent: 'center' }}>
            <TabItem />
          </div>
          :
          <div style={{ width: '100hf', justifyContent: 'center' }}>
            <Filters />
            <TicketsScreen />
          </div>
        } */}

      {/*       </Box> */}
    </Box>

  );
}
