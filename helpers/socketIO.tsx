// useSocket.js

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import dotenv from 'dotenv'
dotenv.config();

const useSocket = () => {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);
        

        return () => { newSocket.close(); };
      }, []);

    if (!socket) { return { socket: null } }
    return { socket };
};

export default useSocket;
