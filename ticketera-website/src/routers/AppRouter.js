import React, { useState, useEffect, useMemo } from 'react';

import { Routes, Route } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { SocketProvider } from '../context/SocketContext';

import { DashboardRoutes } from './DashboardRoutes';
import { startChecking, loadConfigData } from '../redux/actions/userActions';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import encryptStorage from '../helpers/storageEncrypter';
import { CircularProgress, Typography, useTheme } from '@mui/material';
import { SignIn } from '../components/auth/SignIn';
import { LoginRoutes } from './LoginRoutes';
import { MainScreen } from '../components/root/MainScreen';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const theme = useTheme()

    const { checking, user } = useSelector(state => state.auth, shallowEqual);

    useEffect(() => {

        dispatch(loadConfigData()).then((data) => {
            // console.log("CARGO LA DATA CONFIG: ", data);
            dispatch(startChecking()).then(result => {

                if (!result && location.pathname !== '/login') {
                    location.assign('/login')
                }
                console.log("START CHECKING OK ");
                /*                 if (result !== true) {
                                   
                                    
                                } */

            })
        })
            .catch((error) => {

            });

        return () => {
            //  encryptStorage.clear();
        }
    }, [])

    if (checking) {
        return (<div style={{ paddingTop: '20vh', textAlign: 'center' }}>
            <Typography style={{
                paddingBottom: 20,
                fontSize: '2rem',
                color: theme.palette.text.primary
            }}>Espere</Typography>
            <CircularProgress size={60} style={{ color: theme.palette.trans.primary }} />
        </div>)
    }

    return (
        <SocketProvider>
            <Routes>
                {
                    user === null &&
                    <Route path="/*" element={
                        <PublicRoute>
                            <LoginRoutes />
                        </PublicRoute>
                    }
                    />

                }
                {user !== null && <Route path="/*" element={
                    <PrivateRoute>
                        <DashboardRoutes />
                    </PrivateRoute>
                } />}



            </Routes>
        </SocketProvider>
    )
}
