import React, { createContext, useContext, useEffect, useState } from 'react'
const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
    
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState();
    const [message, setMessage] = useState();
    const [type, setType] = useState('');


    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setShow(false);
            }, timer);

            return () => clearTimeout(timer)
        }
    }, [show]);


    const handleClick = () => {
        setShow(false);
    }

    const getType = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    const showToast = (message, type, time) => {
        
        setShow(true);
        const bgColorClass = getType(type);
        setTimer(time);
        setMessage(message);
        setType(bgColorClass);

        // if (timer) {
        //     clearTimeout(timer);
        // }

       
    }

    return (
        <ToastContext.Provider value={{ show, type, handleClick, showToast, message ,setShow ,timer }} >
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider;