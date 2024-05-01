import React from 'react'

const RacerUser = ({margin}) => {
  return (
  
          <div className='h-20 w-full border-b-2 border-white border-dotted p-2'>
              <div className={`ml-[${margin}%]`} >
                  <img src="/logo.png" alt="" className='h-10 w-10' />
                  <h3 className='text-white'>user</h3></div>
          </div>
    
  )
}

export default RacerUser
