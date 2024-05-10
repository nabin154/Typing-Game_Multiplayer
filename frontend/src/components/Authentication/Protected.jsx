import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return user ? <div>{children}</div> : <Navigate to="/" />;
};

export default Protected;
