import React, { useEffect, useState } from 'react';
import RacingBox from './RacingBox';

const TypingTest = () => {
    const [startTest, setStartTest] = useState(false);
    const [startTimer, setStartTimer] = useState(4);

    let paragraph = ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui praesentium, quaerat accusamus ipsam rerum quis vero, magni minima nostrum porro iste nihil! Nemo natus deserunt illo voluptas repellat provident recusandae cumque vitae repellendus saepe, ipsa quisquam mollitia sequi sit pariatur dolore? Corporis qui et laboriosam expedita ea. Impedit, saepe nam suscipit perspiciatis facilis libero soluta quis neque placeat repudiandae molestiae sed deleniti rem est, odio sit in reiciendis cumque ducimus voluptatum ';

    useEffect(() => {
        if (startTest && startTimer > 0) {
            const timer = setTimeout(() => {
                setStartTimer(startTimer - 1);
            }, 1000);
            
            return () => clearTimeout(timer);
        }
         
        
    }, [startTest, startTimer]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <section>
                <div className='ml-4 px-10 py-8 flex flex-col items-center text-justify relative'>
                    {startTest && startTimer >=1 &&
                    <span className=' absolute top-[25%] left-[50%] text-red-500 text-6xl font-bold'>{startTimer}</span>
                    }
                    <p className='text-white font-rubik text-xl'>{paragraph}</p>
                    <button className='mt-10 px-6 py-2 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-md hover:bg-purple-500'
                        onClick={() => setStartTest(true)}>Start Now</button>
                </div>
            </section>
            <section className='h-full w-full hidden md:block'>
                <RacingBox 
                startTest={startTest} 
                startTimer={startTimer}/>
            </section>
        </div>
    );
};

export default TypingTest;
