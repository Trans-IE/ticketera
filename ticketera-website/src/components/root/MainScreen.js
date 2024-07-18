import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { TabsScreen } from './TabsScreen';
import { TicketsScreen } from '../ticket/TicketsScreen/TicketsScreen';
import { Grid } from '@mui/material';
import ContainerWithMenu from './ContainerWithMenu';

export const MainScreen = () => {
  const { editTicketTabShown } = useSelector((state) => state.ui, shallowEqual);

  return (
    <ContainerWithMenu>
      {/* Contenedor para los componentes */}
      <Grid sx={{ position: 'absolute', top: 0, left: 10, zIndex: (editTicketTabShown === -1) ? 1 : 2, padding: '10px' }}>
        <TabsScreen />
      </Grid>

      <Grid sx={{ position: 'absolute', top: 40, left: 10, zIndex: (editTicketTabShown === -1) ? 2 : 1, display: (editTicketTabShown !== -1) ? 'none' : 'block', padding: '10px' }}>
        <TicketsScreen />
      </Grid>
    </ContainerWithMenu>
  );
}
