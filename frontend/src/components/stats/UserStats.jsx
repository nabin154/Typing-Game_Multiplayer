import React from 'react'
import { useUser } from '../../Context/UserProvider'

const UserStats = () => {
  const { user } = useUser();
  return (

    <div className='w-full h-full px-8 md:px-14 lg:px-24 py-12'>
      {user &&
      <div className='flex items-center flex-col shadow-md shadow-purple-500 py-8 rounded-2xl'>
        <img src={user.image} alt="" className='h-36 w-36 lg:h-48 lg:w-48 shadow-md shadow-purple-500 object-cover' style={{ borderRadius: '50%' }} />
        <div className='mt-10'>
          <h3 className=' text-2xl md:text-3xl lg:text-4xl text-white font-rubik font-semibold'
            style={{
              textShadow: "0 0 2px #8A2BE2, 0 0 2px #8A2BE2, 0 0 2px #8A2BE2, 0 0 2px #8A2BE2"
            }}>{user.name}</h3>
          <p className='text-xl text-center text-white '>Good at work !</p>
          <p className='text-xl text-center text-green-600 font-semibold '>{`High Score : ${user.highScore} wpm`}</p>
          <p className='text-right font-rubik text-gray-400 mt-5'> - Typing challenger</p>
        </div>
      </div>
}
    </div>

  )
}

export default UserStats
