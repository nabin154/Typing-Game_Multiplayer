import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { BACKEND_URL } from '../utils/constant';

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [challengerData , setChallengerData] = useState({challenger : '', user:null});
    const socket = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState();

    useEffect(() => {
        socket.current = io(BACKEND_URL);
        return () => {
           
            socket.current.disconnect();
        };
    }, []);

    return (
        <userContext.Provider value={{
            user,
            setUser,
            onlineUsers,
            setOnlineUsers,
            socket: socket.current ,
            challengerData,
            setChallengerData,
        }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
};

export default UserProvider;
