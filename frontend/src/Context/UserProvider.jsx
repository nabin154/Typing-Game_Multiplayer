import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../API/apis';

const userContext = createContext();

const UserProvider = ({ children }) => {
    // const navigate = useNavigate();

const [ user , setUser ] = useState();

const getUserDetails = async()=>{
    try{
    const response = await getUser();
    if(response)
        {
            const data = response.data?.data;
            console.log(data);
            setUser(data);
            
        }
    }catch(error)
    {
        console.log("Error fetching the user!" , err.message);
    }

}

useEffect(()=>{

    getUserDetails();

},[]);


    return (
        <userContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => {
    return useContext(userContext);
}

export default UserProvider;
