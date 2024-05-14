import React, { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserProvider';
import { useNavigate } from 'react-router-dom';


const OnlineUserList = () => {
  const navigate = useNavigate();
  const { onlineUsers, socket, user, setChallengerData } = useUser();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {

    if (isDisabled) {
      setTimeout(() => {
        setIsDisabled(false);
      }, 5000);
      return () => clearTimeout()
    }
  }, [isDisabled])

  const handleChallenge = (friend) => {
    const data = { id: friend._id, user: user };
    socket.emit("challenge", data);
    setChallengerData(prev => ({ ...prev, challenger: user._id }));
  }

  const disableButton = (data) => {
    if (data.status === 'playing') {
      return true
    }
    else {
      return false;
    }
  }
  return (
    <div>
      {onlineUsers && onlineUsers.map(([id, userData]) => (
        <div key={userData._id} className='w-full h-16  flex items-center mt-3 justify-around shadow-sm shadow-white custom-table-gradient rounded-xl'>
          <img src={userData.image} alt="" className='h-14 w-14 object-cover' style={{ borderRadius: '50%' }} />
          <div>
            <h2 className='text-sm'>{userData.name}</h2>
            <div className='flex items-center gap-4'>
              <h2 className='text-green-500 text-sm'>Online</h2>
              <h3 className='text-red-300 text-sm'>{userData.status}</h3>
            </div>
          </div>
          <button
            disabled={disableButton(userData)}
            className={`px-3 py-1 text-sm bg-purple-500 rounded-lg ${disableButton(userData) ? 'cursor-not-allowed' : ''}`}
            onClick={() => handleChallenge(userData)}
          >
            Challenge
          </button>
        </div>
      ))}

    </div>
  );
}

export default OnlineUserList;
