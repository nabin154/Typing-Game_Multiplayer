import React from 'react'

const CompletedModal = ({ completed, handleClose , wpm , errorCount, timeTaken}) => {

    
  return (<>
    {completed &&
    <div className='absolute border h-96 w-96 top-1/3 left-1/3 custom-table-gradient z-10 rounded-2xl '>
     
     <div className='mt-10 flex flex-col items-left ml-14'>
        <h1 className='text-3xl text-green-400 font-rubik font-bold'>Completed !</h1>
        <p  className='mt-12 text-white font-rubik text-2xl font-semibold tracking-wider'>Your WPM is : <span className='text-green-400'>{wpm}</span></p>
        <p className='mt-4 text-white font-rubik text-xl font-semibold tracking-wider '>NO. of ERRORS is : <span className='text-red-400'>{errorCount}</span></p>
        <p className='mt-4 text-white font-rubik text-xl font-semibold tracking-wider '>Time Taken : <span className='text-purple-400'>{timeTaken} sec</span></p>
   <button
   onClick={handleClose} className='ml-10 bg-purple-800 px-4 py-1 rounded-lg mt-8 w-32 text-white text-md font-rubik'>Close & play</button>  
     </div>
    </div>
    }
    </>
  )
}

export default CompletedModal
