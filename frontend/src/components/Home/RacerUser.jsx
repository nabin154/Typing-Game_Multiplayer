import React from 'react';
import { useTypingData } from '../../Context/DataProvider';
import logo from '../../assets/logo.png';

const RacerUser = () => {
        const { margin } = useTypingData();

        return (
                <div className='h-20 w-full border-b-2 border-white border-dotted p-2 relative'>
                        <div className='absolute top-0 left-0' style={{ marginLeft: `${margin}%` }}>
                                <img src={logo} alt="" className='h-10 w-10' />
                                <h3 className='text-white'>user</h3>
                        </div>
                </div>
        );
};

export default RacerUser;
