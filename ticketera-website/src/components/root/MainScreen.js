import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
import Swal from 'sweetalert2';
import { useTheme } from '@mui/styles';
import { logoutUser } from '../../redux/actions/userActions';
import { NewTicketScreen } from '../ticket/NewTicketScreen';

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
  const navigate = useNavigate();
  const { uiMainMenuShown, editTicketTabShown } = useSelector((state) => state.ui, shallowEqual);
  const theme = useTheme();
  const [ticketsListVisible, setTicketsListVisible] = useState(false);

  const mainMenuOnClick = (type, value) => {

    dispatch(mainMenuShownChange(parseInt(value)));

    //  setTicketsListVisible(!ticketsListVisible);

  }

  const userMenuOnClick = (type, value) => {

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
      if (result.isConfirmed) {
        console.log("LOGOUT DE USUARIOS");
        //toast.success('¡Sesión cerrada exitosamente!')
        dispatch(logoutUser());
        navigate('/');
      }
    })

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

              <MainMenu onClick={() => { }} optionSelected={uiMainMenuShown} />
            }
            <Divider style={{ margin: '8px' }} />
            {SecondaryMenu}
          </div>
          <div>
            {<UserMenu onClick={userMenuOnClick} />}
          </div>
        </List>
      </Drawer>

      <Grid style={{ position: 'relative', height: '100vh', width: 'calc(100% - 32pxs)' }}>
        {/* Contenedor para los componentes */}


        <Grid sx={{ position: 'absolute', top: 0, left: 10, zIndex: (editTicketTabShown === -1) ? 1 : 2, padding: '10px' }}>
          <TabsScreen />
        </Grid>

        <Grid sx={{ position: 'absolute', top: 40, left: 10, zIndex: (editTicketTabShown === -1) ? 2 : 1, display: (editTicketTabShown !== -1) ? 'none' : 'block', padding: '10px' }}>
          <TicketsScreen />
        </Grid>
      </Grid>

      {/*       </Box> */}
    </Box>

  );
}
