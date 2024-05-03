import React from 'react'

const UserStats = () => {
  return (

    <div className='w-full h-full px-8 md:px-14 lg:px-24 py-12'>
      <div className='flex items-center flex-col shadow-md shadow-purple-500 py-8 rounded-2xl'>
        <img src={'/Designer.png'} alt="" className='h-36 w-36 lg:h-48 lg:w-48 shadow-md shadow-purple-500' style={{ borderRadius: '50%' }} />
        <div className='mt-10'>
          <h3 className=' text-2xl md:text-3xl lg:text-4xl text-white font-rubik font-semibold'
            style={{
              textShadow: "0 0 2px #8A2BE2, 0 0 2px #8A2BE2, 0 0 2px #8A2BE2, 0 0 2px #8A2BE2"
            }}>Nabin bhandari</h3>
          <p className='text-xl text-center text-white '>Good at work !</p>
          <p className='text-xl text-center text-green-600 font-semibold '>High Score : 34 wpm</p>
          <p className='text-right font-rubik text-gray-400 mt-5'> - Typing challenger</p>
        </div>
      </div>
    </div>

  )
}

export default UserStats
