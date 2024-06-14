import React, { useEffect, useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {

    const { logged } = useSelector((state) => state.auth, shallowEqual);
    const { pathname, search } = useLocation();

    return (
        <>
            {
                logged
                    ?
                    pathname === '/login' ?
                        <Navigate to="/tickets" />
                        :
                        children
                    : <Navigate to="/login" />
            }
        </>
    )
}
