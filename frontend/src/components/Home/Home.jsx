import React, { useEffect, useState } from 'react'
import { VscDebugStart } from "react-icons/vsc";
import TypingTest from './TypingTest';
import Loader from '../UI/Loader';
import { useUser } from '../../Context/UserProvider';
import { getUser } from '../../API/apis';
import { useTypingData } from '../../Context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { setWidth } = useTypingData();
    const [testStarted, setTestStarted] = useState(false);

    const handleTestStart = () => {
        setTestStarted(true);
    }

    const getUserDetails = async () => {
        try {
            const response = await getUser();
            if (response) {
                const data = response.data?.data;
                setUser(data);
                setTimeout(() => {
                    setWidth(100);

                }, 1000);

            }
        } catch (error) {
            console.log("Error fetching the user!", err.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, [navigate]);



    return (
        <div className='custom-gradient  w-full mt-[1px]' style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Loader />
            {!testStarted &&
                <section className='flex flex-col items-center  h-full w-full'>
                    <header className='mt-32 max-w-2xl p-5'>
                        <h3 className=' text-3xl md:text-4xl text-white font-rubik font-semibold text-center'>Welcome to Typing<span className='text-purple-500'> Challenger !</span> </h3>
                        <p className='text-white mt-4 text-center font-rubik'
                            style={{
                                textShadow: "0 0 1px #8A2BE2, 0 0 1px #8A2BE2, 0 0 1px #8A2BE2, 0 0 1px #8A2BE2"
                            }}>
                            "Revolutionize typing practice with our unique platform: challenge friends, track progress, and master your speed and accuracy effortlessly!"
                        </p>

                    </header>

                    <main>
                        <div>
                            <button className='mt-8 sm:mt-14 md:mt-20 px-4 py-2 md:px-6 md:py-3 mb-3 md:mb-0 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-md md:text-lg hover:bg-purple-500'
                                onClick={handleTestStart}>Start Your Test <VscDebugStart size={'21px'} className='ml-2' /></button>
                        </div>
                    </main>
                </section>


            }

            {/* Test started */}
            {testStarted &&
                <TypingTest />
            }
        </div>
    )
}

export default Home
