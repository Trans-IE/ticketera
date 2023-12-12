import React, { createContext, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { getValueFromConfig } from '../helpers/getConfigFunctions';
import { useSocket } from '../hooks/useSocket';
import encryptStorage from '../helpers/storageEncrypter';
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { config, agent } = useSelector(state => state.auth, shallowEqual);

    const socket_host = getValueFromConfig(config, "socket_host");
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(socket_host, encryptStorage.getItem('token'));

    useEffect(() => {
        if (agent !== null) {
            console.log("socket-conectado: " + socket_host);
            conectarSocket();
        }
    }, [agent, conectarSocket]);

    useEffect(() => {
        if (agent === null) {
            console.log("AGENTE NULO => DESCONECTA EL SOCKET");
            desconectarSocket();
        }
    }, [agent, desconectarSocket]);

    return (
        <SocketContext.Provider value={{ socket, online, conectarSocket, desconectarSocket }}>
            {children}
        </SocketContext.Provider>
    )
}
