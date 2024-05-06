import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../API/apis';
import { useTypingData } from './DataProvider';

const userContext = createContext();

const UserProvider = ({ children }) => {
    // const navigate = useNavigate();
    // const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    const [user, setUser] = useState();

 



    return (
        <userContext.Provider value={{
            user,
            setUser,
            
        }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
}

export default UserProvider;
