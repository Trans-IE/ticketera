import React, { useEffect, useMemo, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { SignIn } from '../components/auth/SignIn';
import { Grid } from '@mui/material';

export const LoginRoutes = () => {
  useEffect(() => {
    console.log('estoy aca')
  }, [])

  return (
    <Routes>
      <Route path="login" element={
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item sx={12}>
            <SignIn />
          </Grid>
        </Grid>
      } />
      <Route path="/" element={<Navigate to="/login" />} />

    </Routes>
  )
}
