import React, { Children, createContext, useContext, useEffect, useState } from 'react';

const userContext = createContext();

const UserProvider = ({ children }) => {
 
    const [user, setUser] = useState();
    const [onlineUsers , setOnlineUsers] = useState();

 



    return (
        <userContext.Provider value={{
            user,
            setUser,
            onlineUsers,
            setOnlineUsers,
        }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
}

export default UserProvider;
