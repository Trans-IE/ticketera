import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainScreen } from '../components/root/MainScreen';
import { makeStyles } from '@mui/styles';
import { UserRol } from '../helpers/constants';
import { InvalidSession } from '../components/auth/InvalidSession';
import { TabsScreen } from '../components/root/TabsScreen';

export const DashboardRoutes = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth, shallowEqual);

  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  }));

  if (user?.roles?.includes(UserRol.LocalSM) || user?.roles?.includes(UserRol.LocalTEC)) {

    // ADMINISTRADOR 
    return (
      <Routes>
        <Route path="tickets" element={<MainScreen />} />
      {/*   <Route path="ticket/:id" element={ <TabsScreen /> } /> */}
        <Route path="/" element={<Navigate to="/tickets" />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="error" element={<InvalidSession />} />
        <Route path="/" element={<Navigate to="/error" />} />
      </Routes>
    )
  }

}
