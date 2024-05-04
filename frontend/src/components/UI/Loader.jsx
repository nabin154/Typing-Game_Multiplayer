import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if(width<100){
        const timer = setTimeout(() => {
            setWidth(prevWidth => prevWidth + 70);
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }
    }, [width]);


    return (
        <div className ={`absolute sm:top-20 md:top-[85px] bg-purple-500 h-[5px] shadow ${width >= 100 ? 'hidden' : 'block'}`}
            style={{ width: `${width}%` }}>
        </div>
    );
}

export default Loader;
