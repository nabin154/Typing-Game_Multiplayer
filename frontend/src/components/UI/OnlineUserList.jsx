import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useTypingData } from '../../Context/DataProvider';

const OnlineUserList = () => {
  const navigate = useNavigate();
  const { onlineUsers, socket ,user ,setChallengerData} = useUser();
  const { setTestStarted } = useTypingData();
  const [isDisabled  ,setIsDisabled] = useState(false);

  useEffect(()=>{

if(isDisabled){
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    return ()=> clearTimeout()
  }
  },[isDisabled])

  const handleChallenge = (friend) => {
    const data = {id: friend._id , user: user};
    socket.emit("challenge", data);
    setChallengerData(prev => ({ ...prev, challenger: user._id }));
  setIsDisabled(true);
  }

  return (
    <div>
      {onlineUsers && onlineUsers.map(([id, userData]) => (
        <div key={userData._id} className='w-full h-16  flex items-center mt-3 justify-around shadow-sm shadow-white custom-table-gradient rounded-xl'>
          <img src={userData.image} alt="" className='h-14 w-14 object-cover' style={{ borderRadius: '50%' }} />
          <div>
            <h2 className='text-sm'>{userData.name}</h2>
            <h2 className='text-green-500 text-sm'>Online</h2>
          </div>
          <button disabled={isDisabled}
          className='px-3 py-1 text-sm bg-purple-500 rounded-lg' onClick={() => handleChallenge(userData)}>Challenge</button>
        </div>
      ))}
    
    </div>
  );
}

export default OnlineUserList;
