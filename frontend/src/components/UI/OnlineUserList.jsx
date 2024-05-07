import React from 'react'

const OnlineUserList = () => {
  return (
    <div className='w-full h-16  flex items-center mt-3 justify-around shadow-sm shadow-white custom-table-gradient rounded-xl'>
        <img src="/logo1.png" alt="" className='h-14 w-14 object-cover' style={{borderRadius:'50%'}}/>
      <div >
        <h2 className='text-sm'>Nabin bhandari</h2>
        <h2 className='text-green-500 text-sm'>Online</h2>
      </div>
      <button className='px-3 py-1 text-sm bg-purple-500 rounded-lg'>Challenge</button>

    </div>
  )
}

export default OnlineUserList
