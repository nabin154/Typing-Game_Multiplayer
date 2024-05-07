import React from 'react';
import { useTypingData } from '../../Context/DataProvider';
import logo from '../../assets/logo.png';
import { useUser } from '../../Context/UserProvider';

const RacerUser = () => {
        const { user } = useUser();
        const { margin } = useTypingData();

        return (
                <div className='h-20 w-full border-b-2 border-white border-dotted p-2 relative'>
                        <div className='absolute top-0 left-0' style={{ marginLeft: `${margin}%` }}>
                                <img src={user.image} alt="" className='h-10 w-10 object-cover' style={{ borderRadius: '50%' }} />
                                <h3 className='text-white'>{user.name.split(' ')[0]}</h3>
                        </div>
                </div>
        );
};

export default RacerUser;
