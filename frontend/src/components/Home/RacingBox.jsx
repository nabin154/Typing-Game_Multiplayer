import React, { useEffect, useState } from 'react'
import RacerUser from './RacerUser'

const RacingBox = ({ startTest, startTimer }) => {
    const [margin, setMargin] = useState(0);
    const [seconds, setSeconds] = useState(120);

    useEffect(() => {
        if(startTest && startTimer <= 1 && seconds > 0){
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }
    }, [startTest, startTimer]);


    // useEffect(() => {
    //     if (seconds === 0) {
    //         timerCallback();
    //     }
    // }, [seconds]);


    // const timerCallback = () => {
    //     setSeconds(120);
    //     window.alert("Timer expired! .");

    // };


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };



    const handleClick = () => {
        if (margin <= 80) {
            setMargin(margin + 10);
        }
        else {
            setMargin(0)
        }
    }
    return (

        <main className='flex  flex-col items-center ' >
            <div className=' shadow-sm shadow-white p-4 mt-6 rounded-lg relative border'>
                <h2 className='text-center text-lg font-rubik text-white font-semibold '>Type the text below</h2>
                <p className={`absolute right-2 top-0 ${seconds < 10 ? 'text-red-600' : 'text-purple-500'} font-semibold`}>{formatTime(seconds)}</p>
                <div className=' h-[200px] w-96 max-w-96 mt-3 bg-rightGradientColor flex items-center flex-col rounded-xl '>
                    {/*/ todo : send user image as props*/}
                    <RacerUser margin={margin} />
                </div>
            </div>
            <button className='mt-20 px-6 py-3 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-lg hover:bg-purple-500'
                onClick={handleClick}>click</button>
        </main>

    )
}

export default RacingBox
