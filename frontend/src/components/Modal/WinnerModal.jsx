import React from 'react';
import { useTypingData } from '../../Context/DataProvider';
import { useUser } from '../../Context/UserProvider';
import Confetti from 'react-confetti'; 

const WinnerModal = ({ completed, handleClose, wpm, errorCount, timeTaken }) => {
    const { winnerData } = useTypingData();
    const { challengerData, user } = useUser();

    const getWinner = () => {
        if (winnerData.wpm && challengerData.user && wpm > winnerData.wpm) {
            return "You";
        } else {
            return challengerData.user && challengerData.user.name.split(" ")[0];
        }
    };

    const getChallengerName = () => {
        if (challengerData && challengerData.user) {
            return challengerData.user.name.split(" ")[0];
        }
    }

    return (
        <>
         
            <div className='absolute border h-96 w-[440px] top-1/3 left-1/3 custom-table-gradient z-10 rounded-2xl '>
                <div className='mt-10 flex flex-col items-center justify-center'>
                    <h1 className='text-3xl text-green-400 font-rubik font-bold'>{getWinner()} Won !</h1>
                    <div className='flex items-center justify-between shadow-sm shadow-purple-400 p-3 gap-10'>
                        <div className='font-rubik custom-table-gradient flex flex-col gap-4 items-start'>
                            <div className='flex gap-3 items-center'>
                                <img src={user.image} alt="user image" className='h-10 w-10 object-cover' style={{ borderRadius: '50%' }} />
                                <h3 className='text-md text-white font-rubik font-bold'>{user.name.split(" ")[0]}</h3>
                            </div>
                            <p className='text-md text-white text-center font-rubik'>Your Wpm is : <span className='text-semibold text-green-500'>{wpm}</span></p>
                            <p className='text-md text-white text-center font-rubik'>Your error is :  <span className='text-red-500 text-semibold'>{errorCount}</span></p>
                            <p className='text-md text-white text-center font-rubik'>Timetaken is : <span className='text-purple-500 text-semibold'>{timeTaken}</span></p>
                        </div>
                        <div className='font-rubik custom-table-gradient flex flex-col gap-4 items-start'>
                            <div className='flex gap-3 items-center'>
                                <img src={challengerData.user && challengerData.user.image} alt="user image" className='h-10 w-10 object-cover' style={{ borderRadius: '50%' }} />
                                <h3 className='text-md text-white font-rubik font-bold'>{getChallengerName()}</h3>
                            </div>
                            <p className='font-rubik text-md text-white text-center'>{getChallengerName()} Wpm is : <span className='text-semibold text-green-500'>{winnerData && winnerData.wpm}</span></p>
                            <p className='font-rubik text-md text-white text-center'>{getChallengerName()} error is : <span className='text-red-500 text-semibold'> {winnerData && winnerData.errors}</span></p>
                            <p className='font-rubik text-md text-white text-center'>Timetaken is : <span className='text-purple-500 text-semibold'>{winnerData && winnerData.timeTaken}</span></p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose} className='ml-10 bg-purple-800 px-4 py-1 rounded-lg mt-8 w-32 text-white text-md font-rubik'>Close & play</button>
                </div>
                {getWinner() === 'You' &&
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={400}
                    recycle={false}
                />
               }
            </div>
        </>
    )
}

export default WinnerModal;
