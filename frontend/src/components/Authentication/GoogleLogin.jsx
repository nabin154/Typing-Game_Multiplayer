import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../Context/ToastProvider';
import axiosInstance from '../../utils/axiosInstance';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/google-login-success"); 
                if (response.status === 200) {
                    const { data } = response.data;
                    localStorage.setItem('userInfo', JSON.stringify(data)); 
                    navigate('/home'); 
                    showToast('Logged in successfully!', 'success', 4000);
                } else {
                    showToast('Failed to login with Google.', 'error', 4000);
                }
            } catch (error) {
                showToast('An error occurred while logging in.', 'error', 4000);
            } finally {
                setLoading(false);
            }
        };

        handleGoogleLogin();
    }, [navigate, showToast]);

    return (
        <div className='flex items-start justify-center'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
};

export default GoogleLogin;
