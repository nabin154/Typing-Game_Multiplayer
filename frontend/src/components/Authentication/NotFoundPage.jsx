import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen custom-gradient">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
                <p className="text-xl text-gray-400 mb-8">Oops! Page not found</p>
                <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={()=> navigate('/home')}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
