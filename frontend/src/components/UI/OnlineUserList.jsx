import React from 'react'
import { useUser } from '../../Context/UserProvider'

const OnlineUserList = () => {
  const { onlineUsers} = useUser();

  return (
    <div>
      {onlineUsers && onlineUsers.map(([id , userData])=>(
    <div key={userData._id} className='w-full h-16  flex items-center mt-3 justify-around shadow-sm shadow-white custom-table-gradient rounded-xl'>
        <img src={userData.image} alt="" className='h-14 w-14 object-cover' style={{borderRadius:'50%'}}/>
      <div >
            <h2 className='text-sm'>{userData.name}</h2>
        <h2 className='text-green-500 text-sm'>Online</h2>
      </div>
      <button className='px-3 py-1 text-sm bg-purple-500 rounded-lg'>Challenge</button>

    </div>
      ))}
    </div>
  )
}

export default OnlineUserList
