import React, { useState } from 'react'
import { VscDebugStart } from "react-icons/vsc";
const Home = () => {

    const [testStarted, setTestStarted] = useState(false);
    const handleTestStart = () => {
        setTestStarted(true);
    }

    return (
        <div className='custom-gradient  w-full mt-[1px]' style={{ height: 'calc(100vh - 80px)' }}>
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
                            <button className='mt-20 px-6 py-3 font-rubik font-semibold flex items-center text-white bg-purple-800 rounded-lg border-none outline-none text-lg hover:bg-purple-500'
                                onClick={handleTestStart}>Start Your Test <VscDebugStart size={'21px'} className='ml-2' /></button>
                        </div>
                    </main>
                </section>


            }

            {/* Testing started */}
            <section>

            </section>
        </div>
    )
}

export default Home
