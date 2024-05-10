import React, { useEffect, useState } from 'react';
import { useTypingData } from '../../Context/DataProvider';

const Loader = () => {
    const { width, setWidth } = useTypingData();



    useEffect(() => {
        if (width < 75) {
            const timer = setTimeout(() => {
                setWidth(prevWidth => prevWidth + 2);
            }, 10);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [width]);


    return (
        <div className={`absolute sm:top-20 md:top-[85px] bg-purple-500 h-[3px] shadow ${width >= 100 ? 'hidden' : 'block'}`}
            style={{ width: `${width}%` }}>
        </div>
    );
}

export default Loader;
