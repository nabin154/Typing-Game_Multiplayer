import React, { useEffect, useState } from 'react'
import RacerUser from './RacerUser'
import { useTypingData } from '../../Context/DataProvider';
import { useUser } from '../../Context/UserProvider';
import RacerChallengerUser from './RacerChallengerUser';

const RacingBox = ({ startTest, startTimer, completed, setCompleted }) => {
    const { seconds, setSeconds } = useTypingData();
    const { challengerData } = useUser();

    //Timer for the typing : time
    useEffect(() => {
        if (seconds <= 0) {
            setCompleted(true);
            // setSeconds(10);
            return;
        }
        if (startTest && startTimer < 1 && !completed) {

            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [startTest, startTimer, completed, seconds]);


    //formating the time to display
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (

        <main className='flex  flex-col items-center ' >
            <div className=' shadow-sm shadow-white p-4 mt-6 rounded-lg relative border'>
                <h2 className='text-center text-lg font-rubik text-white font-semibold '>Type the text below</h2>
                <p className={`absolute right-2 top-0 ${seconds < 10 ? 'text-red-600' : 'text-purple-500'} font-semibold`}>{formatTime(seconds)}</p>
                <div className=' h-[200px] w-[350px] max-w-96 mt-3 bg-rightGradientColor flex items-center flex-col rounded-xl '>
                    <RacerUser />
                    {challengerData && challengerData.user &&
                        <RacerChallengerUser />
                    }
                </div>
            </div>

        </main>

    )
}

export default RacingBox
