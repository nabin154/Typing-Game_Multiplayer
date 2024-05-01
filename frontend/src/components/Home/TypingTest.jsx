import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa6";
import RacerUser from './RacerUser';

const TypingTest = () => {
    const [margin, setMargin] = useState(0);
    const [seconds, setSeconds] = useState(120); 

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (seconds === 0) {
           
            timerCallback();
        }
    }, [seconds]);

    const timerCallback = () => {
        window.alert("Timer expired! This is the function being invoked after 2 minutes.");
        // Add any other actions you want to take after the timer expires
    };

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
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <section>
                <div className='ml-4 px-10 py-8 flex flex-col items-center text-justify'>
                    <p className='text-white font-rubik text-xl'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui praesentium, quaerat accusamus ipsam rerum quis vero, magni minima nostrum porro iste nihil! Nemo natus deserunt illo voluptas repellat provident recusandae cumque vitae repellendus saepe, ipsa quisquam mollitia sequi sit pariatur dolore? Corporis qui et laboriosam expedita ea. Impedit, saepe nam suscipit perspiciatis facilis libero soluta quis neque placeat repudiandae molestiae sed deleniti rem est, odio sit in reiciendis cumque ducimus voluptatum explicabo laboriosam mollitia eaque itaque. Enim explicabo, cum illum aliquam sapiente suscipit qui. Ratione libero, et reprehenderit distinctio, fuga voluptates excepturi rem, vitae officiis quasi ipsum sed quos cum molestias illum quia consequatur. Placeat rem, 
                    </p>
                    <button className='mt-10 px-6 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-md hover:bg-purple-500 '>Start Now</button>
                </div>
            </section>

            <section className='h-full w-full hidden md:block'>
                <main className='flex  flex-col items-center ' >
                    <div className=' shadow-sm shadow-white p-4 mt-6 rounded-lg relative border'>
                        <h2 className='text-center text-lg font-rubik text-white font-semibold '>Type the text below</h2>
                        <p className={`absolute right-2 top-0 ${seconds < 10 ? 'text-red-600' : 'text-purple-500'} font-semibold`}>{formatTime(seconds)}</p>
                        <div className=' h-[200px] w-96 max-w-96 mt-3 bg-rightGradientColor flex items-center flex-col rounded-xl '>
                            {/*/ todo : send user image as props*/}
                            <RacerUser margin={margin}/>
                        </div>
                    </div>
                    <button className='mt-20 px-6 py-3 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-lg hover:bg-purple-500'
                        onClick={handleClick}>click</button>
                </main>
            </section>
            
        </div>
    )
}

export default TypingTest
