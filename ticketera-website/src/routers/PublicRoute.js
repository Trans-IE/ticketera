import React, { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { UserRol } from '../helpers/constants';
import encryptStorage from '../helpers/storageEncrypter';

export const PublicRoute = ({ children }) => {
  const { user, logged } = useSelector(state => state.auth, shallowEqual);

  return (!logged)
    ? children
    : <Navigate to="/login" />
}
