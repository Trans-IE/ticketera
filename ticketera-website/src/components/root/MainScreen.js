import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { mainMenuShownChange } from '../../redux/actions/userInterfaceActions';

const drawerWidth = 240;

const ComponenteSuperior = () => {
  return (
    <Grid xs={12} sx={{ position: 'absolute', top: 40, left: 10, zIndex: 2, padding: '10px' }}>
      <TicketsScreen />
    </Grid>
  );
};

const ComponenteInferior = () => {
  return (
    <Grid xs={12} sx={{ position: 'absolute', top: 0, left: 10, zIndex: 1, padding: '10px' }}>
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
  const dispatch = useDispatch();
  const { uiMainMenuShown, editTicketTabShown } = useSelector((state) => state.ui, shallowEqual);

  const [ticketsListVisible, setTicketsListVisible] = useState(false);

  const onClick = (type, value) => {

    dispatch(mainMenuShownChange(parseInt(value)));

    //  setTicketsListVisible(!ticketsListVisible);

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
            {
              
              <MainMenu onClick={onClick} optionSelected={uiMainMenuShown} />
            }
            <Divider style={{ margin: '8px' }} />
            {SecondaryMenu}
          </div>
          <div>
            {<UserMenu />}
          </div>
        </List>
      </Drawer>

      <Grid xs={12} style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {/* Contenedor para los componentes */}


        <Grid xs={12} sx={{ position: 'absolute', top: 0, left: 10, zIndex: (editTicketTabShown === 0)? 1: 2, padding: '10px' }}>
          <TabsScreen />
        </Grid>

        <Grid xs={12} sx={{ position: 'absolute', top: 40, left: 10, zIndex: (editTicketTabShown === 0)? 2: 1, padding: '10px' }}>
          <TicketsScreen />
        </Grid>
      </Grid>

      {/*       </Box> */}
    </Box>

  );
}
