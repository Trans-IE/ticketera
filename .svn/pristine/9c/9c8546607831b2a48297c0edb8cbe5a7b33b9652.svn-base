import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
export const useSocket = (serverPath, token) => {
    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    const conectarSocket = useCallback(() => {
        const socketTemp = io.connect(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                token: token
            }
        });
        setSocket(socketTemp);
    }, [serverPath, token]);

    const desconectarSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => {
            console.log("cliente conectado socket");
            setOnline(true);
        })

    }, [socket])

    useEffect(() => {

        socket?.on('disconnect', () => {
            console.log("cliente desconectado socket");
            setOnline(false);
        })

    }, [socket])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}