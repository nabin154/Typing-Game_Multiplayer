import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../Context/UserProvider';

const Protected = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    // const accessToken = document.cookie.includes('accessToken');
    // const refreshToken = document.cookie.includes('refreshToken');

    // if (!accessToken || !refreshToken) {
    //     return <Navigate to="/" />;
    // }

    return user ? <div>{children}</div> : <Navigate to="/" />;
};

export default Protected;
