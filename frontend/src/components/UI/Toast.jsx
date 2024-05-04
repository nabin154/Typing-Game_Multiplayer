import React, { useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import { AiFillAlert } from "react-icons/ai";
import { useToast } from '../../Context/ToastProvider';

const Toast = () => {

    const { show, type, handleClick, message, showToast, setShow, timer } = useToast();


    useEffect(() => {
        if (!show && message) {
            setShow(true);
        }
    }, [ message]);


    


    return (
        <>
            {show && (
                <div className={`absolute top-0 left-[44%]  shadow-md rounded-md text-white ${type}`}>
                    <button className='absolute top-0 right-0' onClick={handleClick}><MdCancel /></button>
                    <div className='flex gap-4 items-center px-7 py-2 text-xl'>
                        <AiFillAlert />{message}</div>
                </div>
            )} 
        </>
    );
};


export default Toast;